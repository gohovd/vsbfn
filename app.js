var express = require('express');
var app = express();

var UserController = require('./middle/UserController');
app.use('/users', UserController);

var AuthController = require('./middle/AuthController');
app.use('/api/auth/', AuthController);

module.exports = app;