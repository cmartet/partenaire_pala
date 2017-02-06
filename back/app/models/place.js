var mongoose = require('mongoose');

// define the schema for place model
var placeSchema = mongoose.Schema({

    name:
    {
        key: String,    //clé de recherche
        display: String //affichage interface
    },
    city:
    {
        key: String,
        display: String
    },
    adress:
    {
        key: String,
        display: String
    },
    type:     Number, //1: place libre, 2: mur à gauche, 3: trinquet
    photoUrl: String
});

// create the model for places and expose it to the app 
module.exports = mongoose.model('Places', placeSchema);