var express = require('express');
var router = express.Router();

module.exports = function(passport) {
    router.get('/success', function(req, res) {
        res.send({state: 'success', user: req.user? req.user: null});
    });

    router.get('/failure', function(req, res) {
        res.send({state: 'failure', user: null, msg: 'Invalid name or password'});
    });

    //log in
    router.post('/signin', passport.authenticate('signin', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));

    //log in
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));

    //log out
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    })

    return router;
}