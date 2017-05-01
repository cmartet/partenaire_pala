module.exports = {
    "dbUrl" : "mongodb://localhost/partenaire-pala-dev", // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
    "facebookAuth": {
        "clientID": "1832620133730767", // App ID
        "clientSecret": "5fe6fc29966257c674ef231e2af1a59d", // App Secret Key
        "callbackURL": "http://localhost:8090/auth/facebook/callback",
        "passReqToCallback": true,  // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        "profileFields": ["displayName", "email", "name", "photos"]
    },
    "placesApi": "http://www.frontons.net/api/frontons/search?key=754991f3c59c2cd722aa600ff6d349b32b172ee3&l=fr",
    "frontUrl": "http://localhost:3000/#",
    "domainName": "localhost"
};