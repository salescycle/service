var getEfilesData = require('../repo/efile')
var Promise = require('promise');
var initialIndex = require('./initial-index');
var setIndex = require('../repo/set-index');
var getData = require('../repo/get-data')
var _ = require('lodash')
var salesIndexRows = [];
var newSalesHeaderList = [];
var salesConstants = require('../../constants/sales-constants')

function processClient(salesHeaderList){
    return new Promise(function (resolve, reject){
        getData('client').done(function(clientList){
            salesHeaderList.forEach(function(salesHeader){
               var newSalesHeader = Object.assign({},salesHeader);
               var matchingClients =  _.filter(clientList, function(client) { 
                    return client.baseLEID == salesHeader.baseleid 
                           && client.Registered === 'Y'; 
                });
                if(matchingClients.length > 0){
                    newSalesHeader.stage6 = salesConstants.STATUS_COMPLETED;
                    newSalesHeader.status = salesConstants.FOLLOW_THROUGH;
                }
                newSalesHeaderList.push(newSalesHeader);
            })
            resolve(newSalesHeaderList);
        });
    });
}

module.exports = processClient;