"use strict";

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const BCRYPT_DIFFICULTY = 11;

const UserSchema = mongoose.Schema( {
    email: String,
    // password key has to match name of form input
    password: String
});

UserSchema.methods.authenticate = function(password, callback) {
    bcrypt.compare(password, this.password, callback);
};

// middleware to hash password before saving to database
UserSchema.pre('save', function (next) {
    // takes req.body.password hashes, then moves on to then save to database in routes module
    bcrypt.hash(this.password, BCRYPT_DIFFICULTY, (err, hash) => {
        if (err) throw err;
        this.password = hash;
        next();
    });
});

module.exports = mongoose.model('Users', UserSchema);
