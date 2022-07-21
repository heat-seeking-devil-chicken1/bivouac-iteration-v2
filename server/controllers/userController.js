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
        req.newUserID = user._id.toString(); //should it be res? Not sure did not touch.
        return next();
    });
  }

//verifyuser
userController.verifyUser = async (req, res, next) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  console.log('started userController.verifyUser')
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


// used to display the favorites under favorites component
userController.getFavorites = async (req, res, next) => {
  const {id} = req.params;
  try {
    //reference the way favorites are stored to return from database
    const result = await User.findOne({_id: id}); 

    // review how the result is returned
    res.locals.favorites = result;

    return next();
  } catch (error) {
    return next({
      log: 'Could not return favorites in User.getFavorites' + error,
      status: 400,
      message: { err: 'error in getting all favorites' }
    });
  };
};


// Review: look at how the data is being sent back to the body
// Will store the data from the API's
userController.saveFavorite = async (req, res, next) => {
  const { title, shortDescription, state, duration, location, longitude, latitude } = req.body;
  const { id } = req.params;

  try {
    // saving as type favorite to reference when getting
    const result = await User.updateOne({_id: id}, 
      {$push: {favorite: {title, shortDescription, state, duration, location, longitude, latitude}}})
    // res.locals.newFavorites = result;
    console.log("favorites created successfully")
    return next()

  } catch (error) {
    return next({
      log: 'Could not post the favorite in userController.saveFavorites' + error,
      status: 400,
      message: { err: 'error in adding to favorites' }
    });
  };
};

// used to remove an item from favorties
userController.deleteOneFavorite = async (req, res, next) => {
  //will be sent from the front end when we query the data.
  // const user = JSON.parse(localStorage.getItem('user'));
  // const userid = user._id;
  // const { userid, faveid } = req.body;
  const { userid, faveid } = req.params;
  console.log('req.params userController.deleteOneFavorite', req.params)
  try {
    let deletedFavorite = await User.findByIdAndUpdate(
      userid, 
      {$pull: {favorite: {_id: faveid}}})
      // {$pull: {"favorite.$._id": faveid}},
      // {new: true});
    console.log('deleted the fave successfully')
    res.locals.deletedFavorite = deletedFavorite;
    return next()
  } catch (error) {
    return next({
      log: 'Could not delete in userController.deleteOneFavorite' + error,
      status: 400,
      message: { err: 'error in deleting favorite' }
    })
  }
}


module.exports = userController;