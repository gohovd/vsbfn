const config = require('./config');
let mysql = require('mysql');

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
});

function initializeDatabase() {
    
    connection.query("CREATE DATABASE IF NOT EXISTS vikesbf_no", function (err, result) {
        if (err) throw err;
        console.log(result);
    });

    connection.query("CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), phone VARCHAR(255))",
        function (err, result) {
            if (err) throw err;
            console.log(result);
        });

    connection.query("CREATE TABLE IF NOT EXISTS posts (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), content VARCHAR(420), user INT)",
        function (err, result) {
            if (err) throw err;
            console.log(result);
        });
}


module.exports = connection;