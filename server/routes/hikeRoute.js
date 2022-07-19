const express = require('express')
// const { router } = require('../server')
const router = express.Router();
const hikeController = require('../controllers/hikeController');

// get all
// get by :id
// update hike
// create a hike
// delete a hike

router.post('/get-hikes', hikeController.getHikes, (req, res) => {
  return res.status(200).json(res.locals.hikes);
});

router.get('/:id', hikeController.getOneHike, (req, res) => {
  return res.status(200).json(res.locals.hike);
});

router.put('/:id', hikeController.updateOneHike, (req , res) => {
  return res.status(200).send('redirect complete');
});

router.post('/', hikeController.createHike, (req, res) => {
  return res.status(200).json(res.locals.newHike);
});

router.delete('/:id', hikeController.deleteOneHike,(req, res) => {
  return res.status(200).json(res.locals.deletedHike);
});


module.exports = router;












