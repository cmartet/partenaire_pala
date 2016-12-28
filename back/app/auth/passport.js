var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../models/user');
var configAuth = require('../../config/auth');

module.exports = function (passport) {

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user from the session
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy(configAuth.facebookAuth,
        function (req, token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function () {

                // check if the user is already logged in session

                if (!req.user) {

                    // check if the user is already in the database
                    User.findOne({ 'facebook.id': profile.id }, function (err, user) {
                        if (err)
                            return done(err);

                        if (user) {

                            // user found in database, return that user
                             return done(null, user);
                        } else {

                            // if there is no user in database, create it
                            var newUser = new User();

                            newUser.facebook.id = profile.id;
                            newUser.facebook.token = token;
                            newUser.facebook.name = profile.displayName;
                            newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                            //newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

                            newUser.save(function (err) {
                                if (err)
                                    return done(err);

                                return done(null, newUser);
                            });
                        }
                    });

                } else {
                    // user already looged in session, return that user
                    return done(null, req.user);
                }
            });
        }));
};
