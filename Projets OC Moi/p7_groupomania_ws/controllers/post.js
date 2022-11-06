const Post = require("../models/Post");
const fs = require("fs");

/**
Create a post
 */

exports.create = (req, res, next) => {
  try {
    const postObject = req.body;
    const imageURL = req.file === undefined ? "" : `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    const post = new Post({
      userId: postObject.userId,
      title: postObject.title,
      text: postObject.text,
      imageUrl: imageURL,
      createdOn: new Date(),
      likes: 0,
      usersLiked: [],
    });
    console.log(post);
    // database saving
    post
      .save()
      .then(() => {
        console.log("Post enregistré.");
        res.status(201).json({
          message: "Post enregistré.",
        });
      })
      // On ajoute un code erreur en cas de problème
      .catch((error) => {
        console.log("erreur " + error);
        res.status(400).json({
          error,
        });
      });
  } catch (e) {
    console.log(e);
  }
};

/**
 * Read all posts
 */
exports.readAll = (req, res, next) => {
  Post.find()
    .sort({ createdOn: -1 })
    // if OK an array is sent with all data
    .then((posts) => res.status(200).json(posts))
    // else send error message
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
};

/**
 * Read a single post
 */
exports.readOne = (req, res, next) => {
  Post.findById(req.params.id)
    // if OK an array is sent with data
    .then((post) => {
      res.status(200).json(post);
    })
    // else send error message
    .catch((error) =>
      res.status(404).json({
        error,
      })
    );
};

/**
 * Update a post
 */
exports.update = (req, res, next) => {
  let postObject = req.body;
  if (postObject.file) {
    //if a file is given
    // read existing post
    Post.findById(req.params.id)
      .then((post) => {
        // and delete it
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlinkSync(`images/${filename}`);
      })
      .catch((error) =>
        res.status(400).json({
          error,
        })
      );
  }

  const imageURL =
    postObject.file === undefined ? "" : `${req.protocol}://${req.get("host")}/images/${postObject.filename}`;
  postObject = {
    // On modifie les données et on ajoute la nouvelle image
    //...JSON.parse(req.body.apost),
    ...req.body,
    imageUrl: imageURL,
  };
  //first parameter for UpdateOne is filter (to select the object to update)
  //second parameter is dataset to set
  Post.updateOne(
    {
      _id: req.params.id,
    },
    {
      ...postObject,
      _id: req.params.id,
    }
  )
    .then(() =>
      res.status(200).json({
        message: "Post modifié !",
      })
    )
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
};

/**
 * Delete a single post
 */
exports.delete = (req, res, next) => {
  try {
    // before deleting post, delete image file from server
    Post.findById(req.params.id)
      .then((post) => {
        // extract filename from complete URL
        const filename = post.imageUrl.split("/images/")[1];
        // delete file
        fs.unlink(`images/${filename}`, () => {
          // then remove post
          Post.deleteOne({
            _id: req.params.id,
          })
            .then(() =>
              res.status(200).json({
                message: "Post supprimé !",
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
 * Like a post
 */
exports.like = (req, res, next) => {
  Post.findById(req.params.id)
    // if OK an array is sent with data
    .then((post) => {
      try {
        let userId = req.auth.userId;
        //check if same vote was not existing
        let userHasAlreadyVoted = post.usersLiked.includes(userId);
        if (!userHasAlreadyVoted) {
          post.usersLiked.push(userId);
          post.likes++;
        } else {
          post.likes--;
          post.usersLiked = post.usersLiked.filter((e) => e !== userId);
        }
        post
          .save()
          .then(() =>
            res.status(200).json({
              message: "Like enregistré",
            })
          )
          .catch((error) =>
            res.status(400).json({
              error,
            })
          );
      } catch (err) {
        console.log(err);
      }
    })
    // else send error message
    .catch((error) =>
      res.status(404).json({
        error,
      })
    );
};
