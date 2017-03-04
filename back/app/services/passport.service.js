var FacebookStrategy = require('passport-facebook').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

var User = require('../models/user');
var config = require("../config/factory");

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

    passport.use(new FacebookStrategy(config.facebookAuth,
        function (req, token, refreshToken, profile, done) {
            // asynchronous
            process.nextTick(function () {

                // check if the user is already logged in session
                if (!req.user) {
                    // check if the user is already in the database
                    User.findOne({'bearer.id': profile.id}, function (err, user) {
                        if (err)
                            return done(err);

                        if (user) {
                            // user found in database, return that user
                            return done(null, user);
                        } else {
                            var newUser = new User();

                            newUser.bearer.id = profile.id;
                            newUser.bearer.token = token;
                            newUser.bearer.nickname = profile.displayName;
                            newUser.bearer.name = profile.name.givenName + ' ' + profile.name.familyName;
                            if(profile.emails)
                                newUser.bearer.email = (profile.emails[0].value || '').toLowerCase();

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

    passport.use(
        new BearerStrategy(
            function (token, done) {
                User.findOne({'bearer.token': token},
                    function (err, user) {
                        if (err) {
                            return done(err)
                        }
                        if (!user) {
                            return done(null, false)
                        }

                        return done(null, user, {scope: 'all'})
                    }
                );
            }
        )
    );

};
