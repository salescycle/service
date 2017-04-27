var express = require('express');
var router = express.Router();
var pool = require('../common/connection-pool')
var getData = require('../bot/repo/get-data')
var initialHeader = require('../bot/api/initial-header')
var Promise = require('promise')
var setHeader = require('../bot/repo/set-header')
var processEfile = require('../bot/api/process-efiles')

/* GET users listing. */
router.get('/', function(req, res, next) {
    getCrm()
        .then(processStage1And2)
        .then(processStage3)
        .then(populateSalesHeader)
        .then(res.send('done'));
});

function getCrm(){
    return getData('crm');
}

function processStage1And2(crmData){
    var salesHeaderList = [];
    return new Promise(function(resolve, reject){
        crmData.forEach(function(crm) {
            var row = Object.assign({}, initialHeader);
            row.baseleid = crm.BaseLEID;
            row.firstname = crm.clientFirstName;
            row.lastname = crm.clientLastName;
            //stage 1
            if(crm.callsMade !== ''){
                    row.stage1 = 'Y';
                    row.status = 1;
            }
            //stage 2
            if(crm.appoinmentDate !== ''){
                row.stage2 = 'Y';
                row.status = 2;
            }
            salesHeaderList.push(row);
        });
        resolve(salesHeaderList);
    });
}

function processStage3(salesHeaderList){
    return new Promise(function(resolve, reject){
        processEfile(salesHeaderList);
    });
}

function populateSalesHeader(salesHeaderList){
    //console.log('salesHeaderList', salesHeaderList);
    return setHeader(salesHeaderList);
}

module.exports = router;