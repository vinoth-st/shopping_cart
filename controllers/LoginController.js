const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const session = require('express-session');
const { body, validationResult } = require('express-validator');
const app = express();

// Set up express-session middleware
app.use(session({
    secret: 'secret_key', // Secret key for session cookie encryption
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true if using HTTPS
  }));

// Define the validation rules for the login endpoint
exports.loginValidationRules = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ];

exports.index = async (req, res) => {
    try {
        res.render('pages/login');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        if (!req.session) {
            req.session = {};
        }
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const email = req.body.email;
        const token = jwt.sign({ email }, 'secret_key', { expiresIn: '1h' });
        req.session.token = token; // Save token in session
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.log(error); //
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.logout = async (req, res) => {
    if(req.session){
    req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).send('Internal server error');
        }
        // Redirect to the login page or any other page after logout
      });
    }
    res.redirect('/users/login');

}
