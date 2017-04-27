var mysql = require('mysql');
var pool = require('../../common/connection-pool')
var Promise = require('promise');

function getEfilesData(){
    return new Promise(function(resolve, reject){
         pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query('SELECT * FROM efiles', function(error, results, fields) {
            // And done with the connection.
            resolve(results);
            connection.release();
            // Handle error after the release.
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.
            });
        });
    });
}

module.exports = getEfilesData;