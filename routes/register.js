"use strict";

const express = require('express');
const router = express.Router();
const User = require('../lib/user/user.model');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    if (req.body.password === req.body.passwordVerify) {
        User.findOne({email: req.body.email}, (err, user) => {
            if (err) throw err;
            if (user) {
                res.redirect('/login');
            } else {
                // register, then redirect
                User.create(req.body, (err) => {
                    if (err) throw err;
                    res.redirect('/login');
                });
            }
        });
    } else {
        res.render('register', {
            email: req.body.email,
            message: 'Passwords do not match'
        });
    }
});

module.exports = router;
