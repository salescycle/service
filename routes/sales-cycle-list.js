var express = require('express');
var router = express.Router();
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'us-cdbr-azure-southcentral-f.cloudapp.net',
  user     : 'bf2153f494542e',
  password : '2df8ca57',
  database : 'acsm_e2f8e2c1b156bb0'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  connection.connect();
  connection.query('SELECT * from sales_header', function(err, rows, fields) {
    if (!err)
      res.send(rows);
    else
      res.send('Error while performing Query.');
  });  
});

module.exports = router;
