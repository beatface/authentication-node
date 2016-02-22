"use strict";

const express = require('express');
const router = express.Router();

const login = require('./login');

router.use(login);

router.get('/', (req, res) => {
    res.render('index');
})

module.exports = router;
