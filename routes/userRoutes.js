const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');
const RegisterController = require('../controllers/RegisterController');


// Register a new user
router.get('/register', RegisterController.index);
router.post('/register', RegisterController.registerValidationRules, RegisterController.store);


// Login
router.get('/login', LoginController.index);
router.post('/login', LoginController.loginValidationRules, LoginController.login);
router.get('/logout', LoginController.logout);

module.exports = router;
