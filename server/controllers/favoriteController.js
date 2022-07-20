const Favorite = require('../models/favoriteModel.js');
const favoriteController = {};


// used to display the favorites under favorites component
favoriteController.getFavorites = async (req, res, next) => {
  try {
    //reference the way favorites are stored to return from database
    const result = await Favorite.find({type: 'favorite'}); 

    // review how the result is returned
    res.locals.favorites = result;

    return next();
  } catch (error) {
    return next({
      log: 'Could not return favorites in favorite.getFavorites' + error,
      status: 400,
      message: { err: 'error in getting all favorites' }
    });
  };
};


// Review: look at how the data is being sent back to the body
// Will store the data from the API's
favoriteController.saveFavorite = async (req, res, next) => {
  const { title, shortDescription, state, duration, location, longitude, latitude } = req.body;
  try {
    // saving as type favorite to reference when getting
    const result = await Favorite.create({ title, shortDescription, state, duration, location, longitude, latitude, type:'favorite' })
    res.locals.newFavorites = result;
    console.log("favorites created successfully")
    return next()

  } catch (error) {
    return next({
      log: 'Could not post the favorite in favoriteController.saveFavorites' + error,
      status: 400,
      message: { err: 'error in adding to favorites' }
    });
  };
};

// used to remove an item from favorties
favoriteController.deleteOneFavorite = async (req, res, next) => {
  //will be sent from the front end when we query the data.
  const { id } = req.params;
  try {
    let deletedFavorite = await Favorite.findOneAndDelete({_id: id});
    res.locals.deletedFavorite = deletedFavorite;
    return next()
  } catch (error) {
    return next({
      log: 'Could not delete in favoriteController.deleteOneFavorite' + error,
      status: 400,
      message: { err: 'error in deleting favorite' }
    })
  }
}


module.exports = favoriteController;
