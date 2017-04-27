var mysql = require('mysql');
var pool = require('../../common/connection-pool')
var Promise = require('promise');

function getEfilesData(baseleid){
    return new Promise(function(resolve, reject){
         pool.getConnection(function(err, connection) {
            console.log('Got connection to read e-files');
            connection.query('SELECT * FROM efiles', function(error, results, fields) {
            connection.release();
            resolve(results);
            });
        });
    });
}

module.exports = getEfilesData;