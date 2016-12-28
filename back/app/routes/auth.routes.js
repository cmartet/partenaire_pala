module.exports = function (app, passport) {

    app.get('/profile', isLoggedIn, function (req, res) {
        res.send(req.user);
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.send(200);
    });

    // send to facebook to do the authentication
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
