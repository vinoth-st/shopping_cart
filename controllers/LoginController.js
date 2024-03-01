const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// const auth = require('../routes/auth');
const { body, validationResult } = require('express-validator');
const app = express();


//Import the main Passport and Express-Session library
const passport = require('passport')


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
    // Route to handle login
    passport.authenticate('local', { session: false }), (req, res) => {
        // If authentication succeeds, generate JWT token
        const token = jwt.sign({ userId: req.user._id }, 'secret_key', { expiresIn: '1h' });
        res.json({ token });
    }

}
exports.loginqwe = async (req, res) => {
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


exports.dashboard = async (req, res) => {
    res.send('Welcome');
}

exports.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next() }
  res.redirect("/users/login")
}
