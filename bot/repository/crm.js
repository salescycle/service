var mysql = require('mysql');
var pool = require('./common/connection-pool')

var crm = {
    pool.getConnection(function(err, connection) {
        // Use the connection
        connection.query('SELECT * FROM sales_header', function(error, results, fields) {
            // And done with the connection.
            res.send(results);
            connection.release();
            // Handle error after the release.
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.
        });
    });
}