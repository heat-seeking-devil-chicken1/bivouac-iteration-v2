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
    User.findOrCreate({googleId: profile.id, firstName: profile.given_name, lastName: profile.family_name, email: profile.email}, function(err, User){
      console.log(User);
      return done(err, User);
    })

    /* 
      Google OAuth works! The logged profile has user data from Google. In this function we need to either create a new user or find the existing user based on the given data received in profile from Google {firstName : givenName}
    */
   console.log();
  }
));
// auth with google
router.get('/google', passport.authenticate('google', { scope:
  ['profile', 'email']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google', {failureRedirect: '/login'}), (req, res) => res.redirect('/'));


module.exports = router;