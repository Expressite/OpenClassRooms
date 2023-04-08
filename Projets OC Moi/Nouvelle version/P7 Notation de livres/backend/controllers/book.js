const Book = require("../models/Book");
const fs = require("fs");

/**
Create a book
book informations are given as a single string. Values are comma separated
 */
exports.create = (req, res, next) => {
  const bookAsArray = req.body.book.split(",");
  //now convert array to book
  const book = new Book({
    userId: bookAsArray[0],
    title: bookAsArray[1],
    author: bookAsArray[2],
    year: bookAsArray[3],
    genre: bookAsArray[4],
    // On modifie l'URL de l'image, on veut l'URL complète
    imageURL: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    ratings: [],
    average: 0,
  });

  /*const bookObject = JSON.parse(req.body.book);
  const book = new Book({
    ...bookObject,
    // On modifie l'URL de l'image, on veut l'URL complète
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  */
  // database saving
  book
    .save()
    .then(() =>
      res.status(201).json({
        message: "Book saved.",
      })
    )
    // On ajoute un code erreur en cas de problème
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
};

/**
 * Read all books
 */
exports.readAll = (req, res, next) => {
  Book.find()
    // if OK an array is sent with all data
    .then((books) => res.status(200).json(books))
    // else send error message
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
};

/**
 * Read best rated books
 */
exports.readBestRated = (req, res, next) => {
  Book.find()
    .sort({ average: -1 })
    .limit(3)
    // if OK an array is sent with all data
    .then((books) => res.status(200).json(books))
    // else send error message
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
};

/**
 * Read a single book
 */
exports.readOne = (req, res, next) => {
  Book.findById(req.params.id)
    // if OK an array is sent with data
    .then((book) => {
      res.status(200).json(book);
    })
    // else send error message
    .catch((error) =>
      res.status(404).json({
        error,
      })
    );
};

/**
 * Update a book
 */
exports.update = (req, res, next) => {
  let bookObject = {};
  let canModify = false;
  Book.findById(req.params.id)
    .then((book) => {
      if (book) {
        const bookAsArray = null;
        //check user id
        if (req.file) {
          bookAsArray = req.body.book.split(",");
        }
        let userId = req.file
          ? bookAsArray && bookAsArray.length > 0
            ? bookAsArray[0].userId
            : null
          : req.body.userId;
        canModify = book.userId === userId;
        if (canModify) {
          if (req.file) {
            //if a file is given, remove old file
            const filename = book.imageURL.split("/images/")[1];
            fs.unlinkSync(`images/${filename}`);

            //now convert array to book
            bookObject = {
              // On modifie les données et on ajoute la nouvelle image
              userId: bookAsArray[0],
              title: bookAsArray[1],
              author: bookAsArray[2],
              year: bookAsArray[3],
              genre: bookAsArray[4],
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            };
          } else {
            //fill bookObject with data directly available in body request
            bookObject = {
              ...req.body,
            };
          }
          //first parameter for UpdateOne is filter (to select the object to update)
          //second parameter is dataset to set
          Book.updateOne(
            {
              _id: req.params.id,
            },
            {
              ...bookObject,
              _id: req.params.id,
            }
          )
            .then(() =>
              res.status(200).json({
                message: "book updated !",
              })
            )
            .catch((error) =>
              res.status(400).json({
                error,
              })
            );
        } else {
          res.status(403).json({
            message: "Vous n'avez pas l'autorisation de modifier ce livre",
          });
        }
      } else {
        res.status(400).json({
          message: `Le livre avec l'id ${req.params.id} n'existe pas`,
        });
      }
    })
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
};

/**
 * Delete a single book
 */
exports.delete = (req, res, next) => {
  try {
    // before deleting book, delete image file from server
    Book.findById(req.params.id)
      .then((book) => {
        // extract filename from complete URL
        const filename = book.imageURL.split("/images/")[1];
        // delete file
        fs.unlink(`images/${filename}`, () => {
          // then remove book
          Book.deleteOne({
            _id: req.params.id,
          })
            .then(() =>
              res.status(200).json({
                message: "book supprimée !",
              })
            )
            .catch((error) =>
              res.status(400).json({
                error,
              })
            );
        });
      })
      .catch((error) =>
        res.status(500).json({
          error,
        })
      );
  } catch (error) {
    console.log(error);
  }
};

/**
 * Rate a book
 */
exports.rate = (req, res, next) => {
  if (req.body.grade >= 0 && req.body.grade <= 5) {
    try {
      const result = User.any({ _id: req.body.userId });
      Book.findById(req.params.id)
        // if OK an array is sent with data
        .then((book) => {
          if (book) {
            try {
              let userId = req.body.userId;
              let grade = req.body.grade;
              ret = doRating(book, userId, grade);
              res.status(ret.status).json({
                message: ret.message,
              });
            } catch (err) {
              console.log(err);
            }
          } else {
            res.status(404).json({
              message: `Le livre avec l'id ${req.params.id} n'existe pas`,
            });
          }
        })
        // else send error message
        .catch((error) =>
          res.status(404).json({
            error,
          })
        );
    } catch (err) {
      res.status(400).json({
        message: `L'utilisateur avec l'id ${req.params.id} n'existe pas`,
      });
    }
  } else {
    res.status(400).json({
      message: "La note doit être comprise entre 0 et 5",
    });
  }
};

/**
 *
 * @param {*} book book to update
 * @param {*} userId user id
 * @param {*} grade grade given to book
 * add a rating for given book and user id
 */
var doRating = function (book, userId, grade) {
  let ret = new Object();
  ret.status = 200;
  ret.message = "OK";
  //check if user rating was not existing
  if (book.ratings === null) {
    book.ratings = Array();
  }
  const filteredOnCurrentUser = book.ratings.filter((b) => b.userId === userId);
  let userHasAlreadyRated = filteredOnCurrentUser.length > 0;
  if (!userHasAlreadyRated) {
    let rate = new Object();
    rate.userId = userId;
    rate.grade = grade;
    book.ratings.push(rate);
    //compute average grade
    let sum = 0;
    book.ratings.forEach((b) => {
      sum += b.grade;
    });
    book.average = sum / book.ratings.length;

    try {
      book
        .save()
        .then(() => {
          ret.status = 200;
          ret.message = "rating done.";
        })
        .catch((error) => {
          ret.status = 400;
          ret.message = error;
        });
    } catch (error) {
      console.log(error);
    }
  } else {
    ret.status = 200;
    ret.message = "Vous aviez déjà fait un évalué ce livre.";
  }
  return ret;
};
