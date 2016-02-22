"use strict";

const express = require('express');
const router = express.Router();
const User = require('../lib/user/user.model');


router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    // if passwords match
    if (req.body.password === req.body.passwordVerify) {
        // look in database for existing user
        User.findOne({email: req.body.email}, (err, user) => {
            if (err) throw err;
            // if the user exists
            if (user) {
                // redirect to login page
                res.redirect('/login');
            // if user doesn't exist
            } else {
                // register, then redirect
                User.create(req.body, (err) => {
                    if (err) throw err;
                    res.redirect('/login');
                });
            }
        });
    } else {
        // rerender register page and notify user that passwords don't match
        res.render('register', {
            email: req.body.email,
            message: 'Passwords do not match'
        });
    }
});

module.exports = router;
