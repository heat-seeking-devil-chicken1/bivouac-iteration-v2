const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
//const db = require('../db'); // not sure, might throw error. This file is db.js that has not been created yet


router.get('/glogin', function(req, res, next) {
  res.render('login');
});

router.get('/login/federated/google', passport.authenticate('google'));

module.exports = router;

///auth.js 