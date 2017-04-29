module.exports = {
    "dbUrl" : "mongodb://localhost/partenaire-pala-dev", // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
    "facebookAuth": {
        "clientID": "1239828719434445", // App ID
        "clientSecret": "3e91a4f236bb4620a96b4a61d7d77d9f", // App Secret Key
        "callbackURL": "http://api.partenaire-pala-dev.fr/auth/facebook/callback",
        "passReqToCallback": true,  // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        "profileFields": ["displayName", "email", "name", "photos"]
    },
    "placesApi": "http://www.frontons.net/api/frontons/search?key=754991f3c59c2cd722aa600ff6d349b32b172ee3&l=fr",
    "frontUrl": "http://www.partenaire-pala-dev.fr/#",
    "domainName": "partenaire-pala-dev.fr"
};