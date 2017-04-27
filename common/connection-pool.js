var mysql = require('mysql');

var ConnectionPool = mysql.createPool({
    connectionLimit: 4,
    host: 'us-cdbr-azure-southcentral-f.cloudapp.net',
    user: 'bf2153f494542e',
    password: '2df8ca57',
    database: 'acsm_e2f8e2c1b156bb0'
});

modules.exports = ConnectionPool;