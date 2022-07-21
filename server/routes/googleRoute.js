const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

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
    console.log(profile);
  }
));

// auth with google
router.get('/google', passport.authenticate('google', { scope:
  ['profile']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'));

// router.get('/oauth2/redirect/google', passport.authenticate('google', {
//   successRedirect: '/',
//   failureRedirect: '/login'
// }));

module.exports = router;