var mongoose = require('mongoose');

// define the schema for user model
var userSchema = mongoose.Schema({

    bearer         : {
        id           : String,
        email        : String,
        name         : String,
        nickname     : String,
        provider     : String,
        token        : String
    }
});

// create the model for users and expose it to the app
module.exports = mongoose.model('User', userSchema);
