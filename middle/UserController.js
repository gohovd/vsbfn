var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var _ = require('underscore');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var User = require('../models/User');

var connection = require('../db');

// CREATES A NEW USER
router.post('/', function (req, res) {
    var body = _.pick(req.body, 'name', 'email', 'phone'); // required fields*
    var user = User.create(body); // call User constructor

    if (user !== null) { // if User failed to be created, otherwise... connect to database

        let sql = "INSERT INTO `users` (name, email, phone) VALUES ?";
        let values = [
            [user.name, user.email, user.phone]
        ];

        connection.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log(result);
        });
    }

   
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {

});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {

});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {

});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {

});


module.exports = router;