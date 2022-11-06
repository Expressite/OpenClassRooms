//this organise routing for all stuff
const express = require('express');
const router = express.Router();
const stuffController = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, stuffController.createThing);
  
//get single object
router.get('/:id',  auth, stuffController.readThing);
  
//get all objects
router.get('/',  auth, stuffController.readAllThings);

//udate an object
router.put('/:id',  auth, multer, stuffController.updateThing);

//delete an object
router.delete('/:id',  auth, stuffController.deleteThing);

module.exports = router;