var mysql = require('mysql');
var pool = require('../../common/connection-pool')
var Promise = require('promise');
var salesConstants = require('../../constants/sales-constants')

function getDetails(type, baseleid){
    return new Promise(function(resolve, reject){
         pool.getConnection(function(err, connection) {
            console.log('Type ', type);
            console.log('baseleid ', baseleid);
            var query = (type === salesConstants.PPA) ? getPPAQuery(baseleid) : getEfilesQuery();
            console.log('query', query);
            connection.query(query, function(error, results, fields) {
            connection.release();
            resolve(results);
            });
        });
    });
}

function getPlanDetails(clientid){
    return new Promise(function(resolve, reject){
         pool.getConnection(function(err, connection) {
            console.log('clientid ', clientid);
            var query = 'select detail.CLIENT_ID clientId, detail.PLAN_ID planId, '+
                        'detail.STATUS status, detail.DATE planDate, '+
                        'detail.PLAN_NAME planName  '+
                        'from ppadetail detail  '+
                        'where detail.CLIENT_ID = '+clientid;
            console.log('query', query);
            connection.query(query, function(error, results, fields) {
            connection.release();
            resolve(results);
            });
        });
    });
}

function getPPAQuery(baseleid){
    return "select ppa.FIRST_NAME AS firstname, ppa.SURNAME AS lastname, "+
                "ppa.BIRTHDATE AS dob, ppa.GENDER as gender, ppa.STREET as street, "+
                "ppa.CITY as city, ppa.CITY as city, ppa.STATE as state, "+
                "ppa.ZIP_CODE as zipcode , ppa.CLIENT_ID clientId "+
                "from ppa ppa "+
                "where ppa.ROWID in ( "+
                    "select ind.recid from sales_index ind "+
                    "where ind.baseleid = '"+baseleid+"' and ind.type = 'PPA')";
    
}

function getEfilesQuery(){
    return "SELET * FROM EFILES";
}

module.exports = {getDetails,getPlanDetails};