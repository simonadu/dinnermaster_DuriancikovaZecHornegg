var mysql = require('mysql');
var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'project',
    dateStrings: 'date'
});
module.exports = connection;