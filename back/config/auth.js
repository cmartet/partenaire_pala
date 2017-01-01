module.exports = {

    'facebookAuth': {
        'clientID': '1239828719434445', // App ID
        'clientSecret': '3e91a4f236bb4620a96b4a61d7d77d9f', // App Secret Key
        'callbackURL': 'http://195.154.71.242:8090/auth/facebook/callback',
        'profileFields': ['name'],
        'passReqToCallback': true  // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    }
};