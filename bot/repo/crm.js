var mysql = require('mysql');
var pool = require('../../common/connection-pool')
var $ = require('jquery')

function getCrmData(){
    let promise = $.Deferred();
    pool.getConnection(function(err, connection) {
        // Use the connection
        connection.query('SELECT * FROM sales_header', function(error, results, fields) {
            // And done with the connection.
            promise.resolve(results);
            connection.release();
            // Handle error after the release.
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.
        });
    });
    return promise.promise();
}

module.exports = getCrmData;