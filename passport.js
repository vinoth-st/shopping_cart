const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('./models/User');


// Configure local strategy for Passport
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        user.validatePassword(password).then(function(isMatch) {
            // const isMatch = user.va  lidatePassword(password);
            if (!isMatch) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        })
      .catch(err => done(err));
    });
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


