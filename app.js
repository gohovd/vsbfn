var express = require('express');
var app = express();

var UserController = require('./middle/UserController');
app.use('/users', UserController);

var AuthController = require('./middle/AuthController');
app.use('/api/auth/', AuthController);

//===========ROUTING

// LANDING PAGE
app.get('/', function (req, res, next) {
    var fileName = '/views/index.html';
    res.sendFile(__dirname + fileName, function (err) {
        if (err) { next(err) }
    });
})

module.exports = app;