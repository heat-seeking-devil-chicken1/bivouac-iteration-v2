const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://hulkaroy:Pwigginz@cluster0.6njsy.mongodb.net/?retryWrites=true&w=majority"

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
  password : { type : String, required : true }
});

const User = mongoose.model('users', UserSchema);


module.exports = User;
