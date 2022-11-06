/* handle posts routing */
const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//for all routes : auth is used to check token
//get all posts
router.get("/", auth, postCtrl.readAll);
//get a post from given id
router.get("/:id", auth, postCtrl.readOne);
//create a post
router.post("/", auth, multer, postCtrl.create);
//update an existing post
router.put("/:id", auth, postCtrl.update);
//like a post
router.post("/like/:id", auth, postCtrl.like);
//delete a post
router.delete("/:id", auth, postCtrl.delete);

module.exports = router;
