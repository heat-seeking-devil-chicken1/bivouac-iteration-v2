const User = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const express = require('express');

const userController = {};

userController.getAllUsers = (req, res, next) => {
    User.find({}, (err, users) => {
      if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
      res.locals.users = users;
      return next();
    });
  };


//createuser

userController.createUser = async (req, res, next) => {
    const { firstName, lastName, location, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log('hashed password', hashedPassword);
    // console.log('firstName', firstName);
    // console.log('last name', lastName);
    // console.log('location', location);
    // console.log('email', email);
    // console.log('password', password);
    var newUserID;

    User.create({ firstName, lastName, location, email, password: hashedPassword }, (err, user) => {
        if (err) return next({
        log: 'Error creating user at userController.createUser',
        status: 500,
        message: { err: 'An error occurred creating user' },
        });
        req.newUserID = user._id.toString();
        return next();
    });
  }

//verifyuser
userController.verifyUser = async (req, res, next) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  User.findOne({email : req.body.email}, (err, user) => {
    req.newUserID = user._id.toString();
      bcrypt
        .compare(req.body.password, user.password)
        .then((result) => {
          // res.locals.user = user
          console.log('Result is:' ,result);
          if (!result) {
            res.redirect('/signup') 
          } else {
            res.locals.user = user;
            return next();
          }
        })
        .catch((err) => next('Error getting user from database: ' + JSON.stringify(err)))
  });
}

module.exports = userController;