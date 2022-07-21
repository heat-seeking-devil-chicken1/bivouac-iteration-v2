const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://heatedChickens:Apple123@hike-app.bpa7q.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'hikeTracker'
})
.then(() => console.log('Connected to Mongo DB.'))
.catch(err => console.log(err));
  

const UserSchema = new mongoose.Schema({
  firstName : { type : String, required : true } ,
  lastName : { type : String, required : true }, 
  location : { type : String, required : true },
  email : { type : String, required : true },
  password : { type : String, required : true },
  favorite: [
    {title: {type: String, required: false}, shortDescription: {type: String, required : false}, state: { type : String, required : true}, duration: { type : String, required : false}, latitude: {type: String, required: false}, longitude: {type: String, required: false}, location: {type: String, required: false}, images: {type: String, required: false}}
  ]
});


const User = mongoose.model('users', UserSchema);


module.exports = User;
