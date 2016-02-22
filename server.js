"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const routes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 3001;
const SESSION_SECRET = process.env.SESSION_SECRET || 'inspectorgadget';

app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    secret: SESSION_SECRET,
    store: new RedisStore()
}));
// middleware to register user visits
app.use((req, res, next) => {
    req.session.count = req.session.count || 0;
    req.session.count++;
    req.session.visits = req.session.visits || {};
    req.session.visits[req.url] = req.session.visits[req.url] || 0;
    req.session.visits[req.url]++;
    console.log(req.session);
    next();
});
// adding user info to locals for use in jade template
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});


app.use(routes);

mongoose.connect('mongodb://localhost:27017/nodeauth', (err) => {
    if (err) throw err;
    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}!`);
    });
});
