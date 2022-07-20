const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
require('dotenv').config();

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080'
  },
  
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile, {accessToken});
  // User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //   return cb(err, user);
  // });
  }
));

// passport.serializeUser(function(user, cb) {
//   process.nextTick(function() {
//     cb(null, { id: user.id, username: user.username, name: user.name });
//   });
// });

// passport.deserializeUser(function(user, cb) {
//   process.nextTick(function() {
//     return cb(null, user);
//   });
// });

// router.get('/login', function(req, res, next) {
//   res.render('login');
// });

router.get('/federated/google', passport.authenticate('google'));


// router.get('/oauth2/redirect/google', passport.authenticate('google', {
//   successReturnToOrRedirect: '/',
//   failureRedirect: '/login'
// }));


module.exports = router;