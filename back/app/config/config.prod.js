module.exports = {
    "dbUrl": "mongodb://localhost/partenaire-pala", // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
    "facebookAuth": {
        "clientID": "1239828719434445", // App ID
        "clientSecret": "3e91a4f236bb4620a96b4a61d7d77d9f", // App Secret Key
        "callbackURL": "http://api.partenaire-pala.fr/auth/facebook/callback",
        "profileFields": ["name", "email"],
        "passReqToCallback": true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    "frontUrl": "http://www.partenaire-pala.fr"
};