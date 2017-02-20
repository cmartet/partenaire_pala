var middlewares = require('./../helpers/middlewares');

module.exports = function (app, passport) {

    app.get('/profile',  passport.authenticate('bearer', { session: false }), function (req, res) {
        res.json(req.user);
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.send(200);
    });

    // send to facebook to do the authentication
    app.get('/auth/facebook/from/:from', passport.authenticate('facebook', { session: false, scope: ['email'] }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            session: false,
            failureRedirect: '/'
        }),
        function(req, res) {
            res.statusCode = 302;
            res.setHeader('Location', 'http://localhost:3000/#/');
            res.cookie('Authorization', req.user.bearer.token);
            res.send();
        }
    );
};
