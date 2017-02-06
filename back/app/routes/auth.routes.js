var middlewares = require('./../helpers/middlewares');

module.exports = function (app, passport) {

    app.get('/profile', middlewares.isLoggedIn, function (req, res) {
        res.json(req.user);
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.send(200);
    });

    // send to facebook to do the authentication
    app.get('/auth/facebook/from/:from', passport.authenticate('facebook', { scope: 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: 'localhost:3000/',
            failureRedirect: '/'
        })
    );
};
