<?php
         $dbhost = 'vikesbf.no.mysql.service.one.com';
         $dbuser = 'vikesbf_no';
         $dbpass = 'mt5KjByo';

$mysqli = new mysqli($dbhost, $dbuser, $dbpass, "vikesbf_no");
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
echo $mysqli->host_info . "\n";

$mysqli = new mysqli("127.0.0.1", "user", "password", "database", 3306);
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

echo $mysqli->host_info . "\n";

?>

