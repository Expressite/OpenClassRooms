const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;

/* handle user routing */
/*
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

//login
router.post('/login', userCtrl.login);

//signup
router.post('/signup', userCtrl.signup);

module.exports = router;
*/