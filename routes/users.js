var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = require('../common/connection-pool')


/* GET users listing. */
router.get('/', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        // Use the connection
        connection.query('SELECT * FROM users', function(error, results, fields) {
            // And done with the connection.
            res.send(results);
            connection.release();
            // Handle error after the release.
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.
        });
    });
});

module.exports = router;