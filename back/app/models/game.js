var mongoose = require('mongoose');

// define the schema for game model
var gameSchema = mongoose.Schema({

    creator: { type: String, required: true },
    place: { type: String, required: true },
    date: { type: Date, required: true },
    level: { type: String, required: true },
    nbMissingPlayers: { type: Number, min: 1, required: true },
    players: [String],
    message: String
});

// create the model for games and expose it to the app 
module.exports = mongoose.model('Games', gameSchema);