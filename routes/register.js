"use strict";

const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    if (req.body.password === req.body.passwordVerify) {
        res.redirect('/login');
    } else {
        res.render('register', {email: req.body.email});
    }
});

module.exports = router;
