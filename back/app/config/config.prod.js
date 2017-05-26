module.exports = {
    "dbUrl": "mongodb://localhost/partenaire-pala", // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
    "facebookAuth": {
        "clientID": "131334220752055", // App ID
        "clientSecret": "f2ca083aa71d111639b32293daa0147a", // App Secret Key
        "callbackURL": "http://api.partenaire-pala.fr/auth/facebook/callback",
        "profileFields": ["displayName", "email", "name", "photos"],
        "passReqToCallback": true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    "placesApi": "http://www.frontons.net/api/frontons/search?key=754991f3c59c2cd722aa600ff6d349b32b172ee3&l=fr",
    "frontUrl": "http://www.partenaire-pala.fr/#",
    "domainName": "partenaire-pala.fr"
};