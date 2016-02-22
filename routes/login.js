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
        req.session.user = user;
        res.redirect('/');
    });
});

module.exports = router;
