module.exports = {

    isLoggedIn: function (passport) {
        return function (req, res, next) {
            return passport.authenticate('bearer', { session: false })(req, res, next);
        };
    }
};