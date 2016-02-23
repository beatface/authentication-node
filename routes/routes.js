"use strict";

const express = require('express');
const router = express.Router();

const login = require('./login');
const register = require('./register');

router.use(login);
router.use(register);

router.get('/', (req, res) => {
    console.log(req.session);
    res.render('index', {user: res.locals.user});
});

module.exports = router;
