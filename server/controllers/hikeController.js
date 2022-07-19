const { Navigate } = require('react-router-dom' );
const Hike = require('../models/hikesModel.js');
const hikeController = {};

hikeController.getHikes = async (req, res, next) => {
  try {
    const result = await Hike.find({userid: req.body.userid}); //get hikes of the current logged in user
    // if (!result.length) throw 'Could not get all hikes';

    res.locals.hikes = result;
    return next();
  } catch (error) {
    return next({
      log: 'Could all hikes in hikeController.getAllHikes' + error,
      status: 400,
      message: { err: 'error in getting all hikes' }
    });
  };
};


hikeController.getOneHike = async (req, res, next) => {
    const { id } = req.params;

    try {
      const hike = await Hike.findById(id).exec();

      if (hike._id) {
      res.locals.hike = hike;
      return next()
    } else {throw new Error();}
    } catch (error) {
      return next({
        log: 'Error in hikeController.getOneHike middleware' + error,
        status: 400,
        message: {err: 'error in getting hike'}
      })
    } 
};


hikeController.updateOneHike = async (req, res, next) => {
  const { title, difficulty , type , distance , location , date , notes, crowds } = req.body;
  const { id } = req.params
  console.log({id})

  try {
    const newHike = await Hike.findOneAndUpdate( { _id : id }, { title, difficulty , type , distance , location , date , notes, crowds }).exec();
    if(!newHike._id) throw 'Could not find hike';
    res.locals.newHike = newHike;
    console.log('before calling next')
    return next()
    console.log('after calling next')
  } catch (error) {
    return next({
      log: 'Error in hikeController.updateOneHike middleware: ' + error,
      status: 400,
      message: { err: 'error in updating hike' }
    })
  }
}


hikeController.createHike = async (req, res, next) => {
  const { title, difficulty , type , distance , location , date , notes, crowds, userid } = req.body;
  try {
    const result = await Hike.create({ title, difficulty, type , distance , location , date , notes, crowds, userid })
    res.locals.newHike = result;
    console.log("hike created successfully")
    return next()
  } catch (error) {
    return next({
      log: 'Could not post the hike in Hike.createHike' + error,
      status: 400,
      message: { err: 'error in creating hike' }
    });
  };
  //return next();
};


hikeController.deleteOneHike = async (req, res, next) => {
  const { id } = req.params;
  
  try {
    let deletedHike = await Hike.findOneAndDelete({_id: id})
    res.locals.deletedHike = deletedHike
    return next()
  } catch (error) {
    return next({
      log: 'Could not delete the hike' + error,
      status: 400,
      message: { err: 'error in deleting hike' }
    })
  }
}


module.exports = hikeController;
