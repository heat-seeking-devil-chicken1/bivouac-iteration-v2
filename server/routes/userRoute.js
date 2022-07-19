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
  return res.status(200).send(res.locals.user);
});

module.exports = router;
