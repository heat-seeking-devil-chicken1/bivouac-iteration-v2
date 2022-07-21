const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');

require('dotenv').config();

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080"
  },
  
  // THIS FUNCTION NEEDS WORK. 9:19 PM 07-20-22. Last left off here
  function(accessToken, refreshToken, profile, cb) {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);
  }
));

router.get('/federated/google', passport.authenticate('google'));

// router.get('/oauth2/redirect/google', passport.authenticate('google', {
//   successRedirect: '/',
//   failureRedirect: '/login'
// }));

module.exports = router;