"use strict";

const express = require('express');
const router = express.Router();
const User = require('../lib/user/user.model');

router.get('/login', (req, res) => {
    res.render('login');
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
                    res.message = {
                        message: 'Email or password incorrect.'
                    };
                    res.redirect('/login');
                }
            });
        } else {
            res.message = {
                message: 'Email or password incorrect.'
            };
            res.redirect('/login');
        }
    });
});

module.exports = router;
