"use strict";

const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const routes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'inspectorgadget';

app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    secret: SESSION_SECRET,
    store: new RedisStore()
}));
app.use((req, res, next) => {
    req.session.count = req.session.count || 0;
    req.session.count++;
    req.session.visits = req.session.visits || {};
    req.session.visits[req.url] = req.session.visits[req.url] || 0;
    req.session.visits[req.url]++;
    console.log(req.session);
    next();
});

app.use(routes);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}!`);
});
