var mysql = require('mysql');
var pool = require('../../common/connection-pool')
var Promise = require('promise');

function getData(tableName){
    return new Promise(function(resolve, reject){
         pool.getConnection(function(err, connection) {
            console.log('Got connection to get data from a table', tableName);
            connection.query('SELECT * FROM ' + tableName, function(error, results, fields) {
            connection.release();
            resolve(results);
            });
        });
    });
}

module.exports = getData;