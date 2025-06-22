const express = require("express");
const { userSignup, userLogin } = require("../controllers/userControler");
const { validateSignup, validateLogin } = require('../middlewares/userMiddleware');

const router = express.Router();

router.post('/signup',validateSignup, userSignup);
router.post('/login', validateLogin,userLogin);

module.exports = router;
