var mysql = require('mysql');
var pool = require('../../common/connection-pool')
var Promise = require('promise');

function setIndex(indexList){
    return new Promise(function(resolve, reject){
         pool.getConnection(function(err, connection) {
            console.log('Got connection to insert sales index');
            indexList.forEach(function(index){
                connection.query('INSERT INTO SALES_INDEX SET ?', index, function(error, results) {
                });
            }); 
            connection.release();
            resolve();
        });
    });
}

module.exports = setIndex;