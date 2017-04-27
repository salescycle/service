var mysql = require('mysql');
var pool = require('../../common/connection-pool')
var Promise = require('promise');

function setHeader(salesHeaderList){
    return new Promise(function(resolve, reject){
         pool.getConnection(function(err, connection) {
            console.log('Got connection to update header');
            salesHeaderList.forEach(function(headerRow){
                connection.query('INSERT INTO SALES_HEADER SET ?', headerRow, function(error, results) {
                });
            }); 
            connection.release();
            resolve();
        });
    });
}

module.exports = setHeader;