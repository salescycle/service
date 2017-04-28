var getEfilesData = require('../repo/efile')
var Promise = require('promise');
var initialIndex = require('./initial-index');
var setIndex = require('../repo/set-index');
var getData = require('../repo/get-data')
var _ = require('lodash')
var salesIndexRows = [];
var newSalesHeaderList = [];
var salesConstants = require('../../constants/sales-constants')

function processProduct(salesHeaderList){
    return new Promise(function (resolve, reject){
        getData('product').done(function(productList){
            salesHeaderList.forEach(function(salesHeader){
               var newSalesHeader = Object.assign({},salesHeader);
               var matchingProducts =  _.filter(productList, function(product) { 
                    return product.baseLEID == salesHeader.baseleid; 
                });
                if(matchingProducts.length > 0){
                    newSalesHeader.stage5 = salesConstants.STATUS_COMPLETED;
                    newSalesHeader.status = salesConstants.CLOSING;
                }
                newSalesHeaderList.push(newSalesHeader);
            })
            resolve(newSalesHeaderList);
        });
    });
}

module.exports = processProduct;