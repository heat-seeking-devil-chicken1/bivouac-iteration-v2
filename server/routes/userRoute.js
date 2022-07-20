const express = require("express");
const router = express.Router();
const userController = require ('../controllers/userController');





//signup

router.get('/getall', userController.getAllUsers, (req,res) => {
    return res.status(200).json(res.locals.users)
})

router.post('/signup', userController.createUser, (req, res) => {
  return res.status(200).send('user signed up!');
});

//login
router.post('/login', userController.verifyUser, (req,res) => {
  console.log('goes to log')
  return res.status(200).send(res.locals.user);
});


// routing favorites below:

// get method to iterate over the arrays in the frontend
router.get('/favorites/:id', userController.getFavorites, (req,res) => {
  // Review: to see how data is being returned
  return res.status(200).json(res.locals.favorites);
});


//Review: how data will be returned
router.put('/saveFave/:id', userController.saveFavorite, (req,res) => {
  // Review: to see how data is being returned
  return res.status(200);
});

//use this to delete favorite
router.put('/favorites/:userid/:faveid', 
  userController.deleteOneFavorite,
  (req,res) => {
  // Review: to see how data is being returned
  return res.status(200);
});


module.exports = router;
