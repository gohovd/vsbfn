const config = require('./config');
let mysql = require('mysql');
let yaml = require('js-yaml');
let fs = require('fs');
var logger = require('logger').createLogger();

logger.setLevel('error');

const OVERWRITE_USERS = false;

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
    // console.log('Connected to the MySQL server, id: ' + connection.threadId);
    logger.info('Connected to the MySQL server, id: ' + connection.threadId);
    initializeDatabase();
    initializeUsers();
});

function initializeDatabase() {
    if (OVERWRITE_USERS) {
        connection.query("DROP TABLE IF EXISTS `users`", function(err, res) {
            if (err) throw err;
            logger.info("Users table dropped.");
        });
    }

    connection.query("CREATE DATABASE IF NOT EXISTS vikesbf_no", function (err, res) {
        if (err) throw err;
        if (res.affectedRows == 0) {
            logger.info('Database already exists')
        } else if (res.affectedRows > 0) {
            logger.info('Database created');
        }
    });

    connection.query("CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), phone VARCHAR(255), role VARCHAR(255))",
        function (err, res) {
            if (err) throw err;
            if (res.affectedRows == 0) {
                logger.info("Table 'users' already exists.");
            } else if (res.affectedRows > 0) {
                logger.info("Table 'users' created.");
            }
        });

    connection.query("CREATE TABLE IF NOT EXISTS posts (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), content VARCHAR(420), user INT)",
        function (err, res) {
            if (err) throw err;
            if (res.affectedRows == 0) {
                logger.info("Table 'posts' already exists.");
            } else if (res.affectedRows > 0) {
                logger.info("Table 'posts' created.");
            }
        });
}

function initializeUsers() {
    try {
        var users = yaml.safeLoad(fs.readFileSync('./data/users.yml', 'utf8'));
        let sql_ins = "INSERT INTO `users` (name, email, phone, role) VALUES ?";

        for (var main_user of users.main_user) {
            let values = [[main_user.name, main_user.email, main_user.phone, main_user.role]];
            let sql_sel = "SELECT * FROM `users` WHERE email = '" + main_user.email + "'";

            connection.query(sql_sel, function (err, res) {
                if (err) throw err;
                else if (res.length > 0) {
                   logger.info("User already exists.");
                } else {
                   logger.info("User does not exist, adding to db now.");
                    connection.query(sql_ins, [values], function (err, res) {
                        if (err) throw err;
                    });
                }
            });
        }
    } catch (e) {
        logger.error(e);
    }

}

module.exports = connection;