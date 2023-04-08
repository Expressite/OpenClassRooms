/* handle user routing */
const express = require("express");
const router = express.Router();
const bookCtrl = require("../controllers/book");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//for all routes : auth is used to check token
//get all books
router.get("/", auth, bookCtrl.readAll);
//get best rated books
//important : be sure to place this line before router.get("/:id"). Else, "bestrating" will be considered as a book id !
router.get("/bestrating", auth, bookCtrl.readBestRated);
//get a book from given id
router.get("/:id", auth, bookCtrl.readOne);
//create a new book
router.post("/", auth, multer, bookCtrl.create);
//update an existing book
router.put("/:id", auth, multer, bookCtrl.update);
//like or dislike a book
router.post("/:id/rating", auth, bookCtrl.rate);
//delete a book
router.delete("/:id", auth, multer, bookCtrl.delete);

module.exports = router;
