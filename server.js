var express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy

const passport = require('passport');
const session = require('express-session');

const RegisterController = require('./controllers/RegisterController');

var app = express();


// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: false })); 
//form-urlencoded


// Set up express-session middleware
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false
  }));

  // Set up Passport
app.use(passport.initialize());
app.use(passport.session());


const PORT = 3000;
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/shopping_cart', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/users', userRoutes);

//Models
// require('./models/User');
// require('./passport');


// Configure local strategy for Passport
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        user.comparePassword(password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  }));


// Serialize user for session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
  
  // Deserialize user from session
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err);
      });
  });


// set the view engine to ejs
app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});