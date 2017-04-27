var express = require('express');
var router = express.Router();
var mysql      = require('mysql');

var pool = mysql.createPool({
  connectionLimit : 4,
  host     : 'us-cdbr-azure-southcentral-f.cloudapp.net',
  user     : 'bf2153f494542e',
  password : '2df8ca57',
  database : 'acsm_e2f8e2c1b156bb0'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  pool.getConnection(function(err, connection) {
  // Use the connection
  connection.query('SELECT * FROM sales_header', function (error, results, fields) {
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
