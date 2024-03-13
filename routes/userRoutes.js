const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');
const RegisterController = require('../controllers/RegisterController');
const passport = require('passport');
const authenticationMiddleware = require('../middleware')


// Register a new user
router.get('/register', RegisterController.index);
router.post('/register', RegisterController.registerValidationRules, RegisterController.store);


// Route to handle login
// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/users/dashboard',
//     failureRedirect: '/users/login',
//     failureFlash: true
//   }));

router.get('/login', LoginController.index);
router.use(passport.authenticate('local', { session: false }))
router.post('/login', LoginController.login)

  
// Login
// router.post('/login', LoginController.loginValidationRules, LoginController.login);
router.get('/logout', LoginController.logout);


router.get("/dashboard", authenticationMiddleware,  LoginController.dashboard)
router.get("/logout", (req,res) => {
    req.logOut()
    res.redirect("/users/login")
    console.log(`-------> User Logged out`)
 })

module.exports = router;

