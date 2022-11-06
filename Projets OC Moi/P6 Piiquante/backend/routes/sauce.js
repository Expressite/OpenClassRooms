/* handle user routing */
const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//for all routes : auth is used to check token
//get all sauces
router.get('/', auth, sauceCtrl.readAll);
//get a sauce from given id
router.get('/:id', auth, sauceCtrl.readOne);
//create a new sauce
router.post('/', auth, multer, sauceCtrl.create);
//update an existing sauce
router.put('/:id', auth, sauceCtrl.update);
//like or dislike a sauce
router.post('/:id/like', auth, multer, sauceCtrl.like);
//delete a sauce
router.delete('/:id', auth, multer, sauceCtrl.delete);

module.exports = router;