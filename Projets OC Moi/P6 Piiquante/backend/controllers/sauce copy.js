const Sauce = require('../models/Sauce');

/**
Create a sauce
 */
exports.create = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        // On modifie l'URL de l'image, on veut l'URL complète
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
      });
      // database saving
      sauce.save()        
        .then(() => res.status(201).json({
          message: 'Sauce enregistrée.'
        }))
        // On ajoute un code erreur en cas de problème
        .catch(error => res.status(400).json({
          error
        }));
}

/**
 * Read all sauces
 */
exports.readAll = (req, res, next) => {
    Sauce.find()
    // if OK an array is sent with all data
    .then(sauces => res.status(200).json(sauces))
    // else send error message
    .catch(error => res.status(400).json({
      error
    }));
}

/**
 * Read a single sauce
 */
 exports.readOne = (req, res, next) => {
    Sauce.findById(req.params.id)
    // if OK an array is sent with data
    .then(sauce => {
        res.status(200).json(sauce);
        }
    )
    // else send error message
    .catch(error => res.status(404).json({
      error
    }));
}

/**
 * Update a sauce
 */
 exports.update = (req, res, next) => {
    let sauceObject = {};
    if(req.file){//if a file is given
      // read existing sauce
      Sauce.findById(req.params.id)
      .then((sauce) => {
        // remove old file
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlinkSync(`images/${filename}`);

        sauceObject = {
            // On modifie les données et on ajoute la nouvelle image
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${
              req.file.filename
            }`};
      })
      .catch((error) => res.status(400).json({
        error
      }))
    }
    else{
        //fill sauceObject with data directly available in body request
      sauceObject = {
        ...req.body
      }
    }
    //first parameter for UpdateOne is filter (to select the object to update)
    //second parameter is dataset to set
    Sauce.updateOne(        
        {
          _id: req.params.id
        }, {
          ...sauceObject,
          _id: req.params.id
        }
      )
      .then(() => res.status(200).json({
        message: 'Sauce modifiée !'
      }))
      .catch((error) => res.status(400).json({
        error
      }))
  }

  /**
   * Delete a single sauce
   */
  exports.delete = (req, res, next) => {

  };

  /**
   * Like a sauce
   */
  exports.like = (req, res, next) => {
    console.log("LIKE try to find sauce " + req.params.id);
    Sauce.findById(req.params.id)
    // if OK an array is sent with data
    .then(sauce => { 
        try{     
            let userId = req.body.userId;
            let like = req.body.like;
            let userHasAlreadyLiked = sauce.usersLiked.includes(userId);
            if(like === 1){
                console.log("like");
                //check if user has not already liked
                if(!userHasAlreadyLiked){
                    removeVote(sauce, userId, "unlike");
                    sauce.usersLiked.push(userId);
                    sauce.likes++;                        
                    sauce.save()
                        .then(() => res.status(200).json({
                            message: 'Like ajouté !'
                        }))
                        .catch((error) => res.status(400).json({
                            error
                        }));
                    }
                    else{
                        res.status(200).json({
                            "message":"Vous avez déjà liké cette sauce !"
                        });
                    }                
                }
            else if(like === -1){
                console.log("unlike");
                if(userHasAlreadyLiked){                    
                    res.status(200).json({
                        message: 'Like retiré !'
                    });      
                }
                else{
                    res.status(200).json({
                        message: "Vous n'aviez pas liké cette sauce !"
                    });      
                }  
            }
            else if(like === 0){
                removeVote(sauce, userId, "like");
                removeVote(sauce, userId, "unlike");
                sauce.save()
                .then(() => 
                res.status(200).json({
                    message: "Like/Dislike effacé !"
                }))
                .catch((error) => res.status(400).json({
                    error
                }));
            }
        }
        catch(err){
            console.log(err);
        }
    })
    // else send error message
    .catch(error => res.status(404).json({
      error
    }));
}

/**
 * 
 * @param {*} sauce sauce to update
 * @param {*} userId user id
 * @param {*} action "like" or "unlike"
 * remove like or unlike from sauce
 */
var removeVote = function(sauce, userId, action){
    if(action === "like"){
        //check if user has already liked
        if(sauce.usersLiked.includes(userId)){
            sauce.likes--;
            sauce.usersLiked = sauce.usersLiked.filter(e => e !== userId);
        }
    }
    else if(action === "unlike"){
        //check if user has already unliked
        if(sauce.usersDisliked.includes(userId)){
            sauce.dislikes--;
            sauce.usersDisliked = sauce.usersDisliked.filter(e => e !== userId);
        }
    }
}

/**
 * 
 * @param {*} sauce sauce to update
 * @param {*} userId user id
 * @param {*} action "like" or "unlike"
 * add a vote for given sauce and user id
 */
var addVote = function(sauce, userId, action){

}