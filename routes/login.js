"use strict";

const express = require('express');
const router = express.Router();
const User = require('../lib/user/user.model');

router.get('/login', (req, res) => {
    res.render('login', {message: res.message});
});


router.post('/login', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) throw err;
        if (user) {
            // attempt login
            user.authenticate(req.body.password, (err, valid) => {
                if (err) throw err;
                if (valid) {
                    req.session.user = user;
                    res.redirect('/');
                } else {
                    // res.message = 'Email or password incorrect.';
                    res.redirect('/login');
                }
            });
        } else {
            // res.message = 'Email or password incorrect.';
            res.redirect('/login');
        }
    });
});

router.delete('/logout', (req, res) => {
    req.session.destroy(function(err) {
        if (err) throw err;
        // cannot access session here
        res.redirect('/login');
    });
});

module.exports = router;
