const config = require('./config');
let mysql = require('mysql');
let yaml = require('js-yaml');
let fs = require('fs');

let connection = mysql.createConnection({
    host: config.l_host,
    user: config.l_user,
    password: config.l_password,
    database: config.l_database
});

connection.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server, id: ' + connection.threadId);
    initializeDatabase();
    initializeUsers();
});

function initializeDatabase() {

    connection.query("CREATE DATABASE IF NOT EXISTS vikesbf_no", function (err, res) {
        if (err) throw err;
        if (res.affectedRows == 0) {
            console.log("Database already exists.");
        } else if (res.affectedRows > 0) {
            console.log("Database created.");
        }
    });

    connection.query("CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), phone VARCHAR(255))",
        function (err, res) {
            if (err) throw err;
            if (res.affectedRows == 0) {
                console.log("Table 'users' already exists.");
            } else if (res.affectedRows > 0) {
                console.log("Table 'users' created.");
            }
        });

    connection.query("CREATE TABLE IF NOT EXISTS posts (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), content VARCHAR(420), user INT)",
        function (err, res) {
            if (err) throw err;
            if (res.affectedRows == 0) {
                console.log("Table 'posts' already exists.");
            } else if (res.affectedRows > 0) {
                console.log("Table 'posts' created.");
            }
        });
}

function initializeUsers() {
    try {
        var users = yaml.safeLoad(fs.readFileSync('./data/users.yml', 'utf8'));
        let sql_ins = "INSERT INTO `users` (name, email, phone) VALUES ?";

        for (var main_user of users.main_user) {

            let values = [[main_user.name, main_user.email, main_user.phone]];
            let sql_sel = "SELECT * FROM `users` WHERE email = '" + main_user.email + "'";

            connection.query(sql_sel, function (err, res) {
                if (err) throw err;
                else if (res.length > 0) {
                    console.log("User already exists.");
                } else {
                    console.log(res);
                    console.log("User does not exist, adding to db now.");
                    connection.query(sql_ins, [values], function (err, res) {
                        if (err) throw err;
                    });
                }
            });
        }
    } catch (e) {
        console.log(e);
    }

}

module.exports = connection;