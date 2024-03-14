const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const LoginController = require('../controllers/LoginController');
const RegisterController = require('../controllers/RegisterController');
const HomeController = require('../controllers/HomeController');
const passport = require('passport');
const authenticationMiddleware = require('../middleware')

router.get('/', HomeController.index);

// Route to display product listing page
router.get('/products', ProductController.index);
router.get('/products/add', ProductController.add);
router.post('/products/add', ProductController.store);
router.get('/products/:id/edit', ProductController.edit);
router.post('/products/:id/edit', ProductController.update);
router.get('/products/:id/delete', ProductController.delete);
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
