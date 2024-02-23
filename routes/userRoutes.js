const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/RegisterController');
const LoginController = require('../controllers/LoginController');

// Register a new user
router.get('/register', RegisterController);
router.post('/register', RegisterController.store);

// Login
router.get('/login', UserController);
router.post('/login', UserController.login);

module.exports = router;
