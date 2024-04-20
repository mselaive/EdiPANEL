const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'project_jwt',
});

module.exports = connection;