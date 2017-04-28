var getEfilesData = require('../repo/efile')
var Promise = require('promise');
var initialIndex = require('./initial-index');
var setIndex = require('../repo/set-index');
var getData = require('../repo/get-data')
var _ = require('lodash')
var salesIndexRows = [];
var newSalesHeaderList = [];
var salesConstants = require('../../constants/sales-constants')

function processEfiles(salesHeaderList){
    return new Promise(function (resolve, reject){
        getData('efiles').done(function(efilesList){
            salesHeaderList.forEach(function(salesHeader){
               var newSalesHeader = Object.assign({},salesHeader);
               var matchingEfiles =  _.filter(efilesList, function(efile) { 
                    return efile.baseLEID == salesHeader.baseleid; 
                });
                if(matchingEfiles.length > 0){
                    matchingEfiles.forEach(function(data){
                        var row = Object.assign({}, initialIndex);
                        row.baseleid = data.baseLEID;
                        row.type = salesConstants.EFILES;
                        row.recid = data.rowid;
                        salesIndexRows.push(row);
                    });
                    newSalesHeader.stage3 = salesConstants.STATUS_GET_MORE_DETAILS;
                    newSalesHeader.status = salesConstants.FACTFINDING;
                }
                newSalesHeaderList.push(newSalesHeader);
            })
            setIndex(salesIndexRows);
            resolve(newSalesHeaderList);
        });
    });
}

module.exports = processEfiles;