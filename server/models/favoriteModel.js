const mongoose = require('mongoose')


const FavoriteSchema = new mongoose.Schema({
  title: {type: String, required: false},
  shortDescription: {type: String, required : false},
  state: { type : String, required : true}, 
  duration: { type : String, required : false},
  latitude: {type: String, required: false},
  longitude: {type: String, required: false},
  location: {type: String, required: false},
  type: {type: String, required: false}
});

const Favorite = mongoose.model('favorites', FavoriteSchema)

module.exports = Favorite;
