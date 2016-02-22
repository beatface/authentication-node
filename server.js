"use strict";

const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');

const routes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(routes);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}!`);
});
