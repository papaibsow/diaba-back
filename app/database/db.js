'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'remotemysql.com',
    user     : 'WViA02kZ6z',
    password : 'E2yKo2jmnE',
    database : 'WViA02kZ6z'
});

connection.connect(function(err) {
    if (err) {
        console.log('error when connecting to db:', err);

    }else{
        console.log('successfully connected to db:');

    };
});

module.exports = connection;