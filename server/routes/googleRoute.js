const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/usersModel');

// enables us to pull information from .env file
require('dotenv').config();

passport.use(new GoogleStrategy(
  {
    // google client id and secret from creating a project in Google Cloud Platform 
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/redirect",
  },
  
  // THIS FUNCTION NEEDS WORK. 9:19 PM 07-20-22. Last left off here
  function(accessToken, refreshToken, profile, done) {
    console.log('wow in callback function');
    console.log(profile.id);
    User.findOrCreate({googleId: profile.id, firstName: profile.given_name, lastName: profile.family_name, email: profile.email}, function(err, user){
      console.log('in the findOrCreate');
      // res.locals.googleUser = googleUser;
      console.log('finishing the findOrCreate')
      return done(err, user);
    });
  }
));

//serialize
passport.serializeUser((user, done) => {
  done(null, user);
});

//deserialize is used to end login session.
passport.deserializeUser((user, done) => {
  User.findById(user.id).then(id => {
    done(null, id);
  })
});


// auth with google
router.get('/google', passport.authenticate('google', { scope:
  ['profile', 'email']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google', {failureRedirect: '/login'}), (req, res) => {
  const googleData = req.session.passport.user;
  res.status(200).send(googleData); // where do you get sent to ? local storage? 
});


module.exports = router;