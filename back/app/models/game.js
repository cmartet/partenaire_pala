var mongoose = require('mongoose');

// define the schema for game model
var gameSchema = mongoose.Schema({
 
    creator: {
        _id:            { type: String, required: true },
        name:           { type: String, required: true }
    },
    place: {
        fronton_id:     { type: Number, required: true },
        type:           { type: String, required: true },
        permalink:      { type: String, required: true },
        photo:          { type: String, required: true },
        name:           { type: String, required: true },
        location: {
            lat:        { type: Number, required: true },
            lng:        { type: Number, required: true },
            address:    { type: String, required: true },
            search_key: { type: String }
        }
    },
    date:               { type: Date,   required: true },
    level:              { type: String, required: true },
    maxMissingPlayers:  { type: Number, min: 1, required: true },
    players: [{
        _id:            String,
        name:           String
    }],
    message:            String
});

// create the model for games and expose it to the app 
module.exports = mongoose.model('Games', gameSchema);