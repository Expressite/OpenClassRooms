const Thing = require('../models/Thing');
const fs = require('fs');

exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

  exports.readThing = (req, res, next) => {
    Thing.findById(req.params.id) // is equivalent to Thing.findOne({ _id: req.params.id })  
      .then(objectFound => res.status(200).json(objectFound)) //object variable name is free, you can choose it !
      .catch(error => res.status(404).json({ error }));
  }

  exports.readAllThings = (req, res, next) => {
    Thing.find({userId: req.auth.userId})
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  }

  exports.updateThing = (req, res, next) => {
    //create an object to update depending on the body
    //if a file is sent, we update the imageUrl
    const thingObject = req.file ?
      {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

  exports.deleteThing = (req, res, next) => {
    Thing.findById(req.params.id)
    .then(
      (thing) => {
        if (!thing) {
          return res.status(404).json({ error: 'Objet non trouvé !'});
        }
        if(thing.userId !== req.auth.userId){
          return res.status(401).json({ error: 'Vous n\'avez pas le droit de supprimer cet objet !'});
        };
        Thing.findOne({ _id: req.params.id })
        .then(thing => {
          const filename = thing.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Thing.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
          });
      })
      .catch(error => res.status(500).json({ error }));
    })    
  };
