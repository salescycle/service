var getEfilesData = require('../repo/efile')
var Promise = require('promise');
var initialIndex = require('./initial-index');
var setIndex = require('../repo/set-index');
var getData = require('../repo/get-data')
var _ = require('lodash')
var salesIndexRows = [];
var newSalesHeaderList = [];
var salesConstants = require('../../constants/sales-constants')
var score = require('../../constants/score');

function processppa(salesHeaderList,crmDataList){
    return new Promise(function (resolve, reject){
        getData('ppa').done(function(ppaList){
            console.log(ppaList);
            salesHeaderList.forEach(function(salesHeader){
                var newSalesHeader = Object.assign({},salesHeader);
                //console.log(newSalesHeader);
                ppaList.forEach(function(ppa){
                    var potentialppamatch = ppa.LEGACY_ID === salesHeader.baseleid 
                        && ppa.SURNAME === salesHeader.lastname; 
                    //console.log(potentialppamatch);
                    if(potentialppamatch.length > 0){
                        potentialppamatch.forEach(function(ppamatch){
                            var row = Object.assign({}, initialIndex);
                            row.baseleid = salesHeader.baseleid;
                            row.type = salesConstants.PPA;
                            row.recid = ppamatch.ROWID;
                            salesIndexRows.push(row);
                        });
                        newSalesHeader.stage4 = salesConstants.STATUS_GET_MORE_DETAILS
                        newSalesHeader.status = salesConstants.PREPERATION;
                    }else{
                        var totalScore = getScore(salesHeader,ppa,crmDataList);
                        if(totalScore > 1){
                            var row = Object.assign({}, initialIndex);
                            row.baseleid = salesHeader.baseleid;
                            row.type = salesConstants.PPA;
                            row.recid = ppa.ROWID;
                            row.score = totalScore;
                            salesIndexRows.push(row);
                            newSalesHeader.stage4 = salesConstants.STATUS_GET_MORE_DETAILS
                            newSalesHeader.status = salesConstants.PREPERATION;
                        }
                    }
                })
                newSalesHeaderList.push(newSalesHeader);
            })
            setIndex(salesIndexRows);
            resolve(newSalesHeaderList);
        });
    });
}

function getScore(salesHeader, ppa, crmDataList){
    //console.log(crmDataList);
    var totalscore = 0.0;
    var crm =  _.filter(crmDataList, function(crmData) { 
                    return salesHeader.baseleid == crmData.BaseLEID; 
                })[0];
    let gender = ppa.GENDER === 0 ? 'M' : 'F';
    if(crm.clientLastName  === ppa.SURNAME){
        totalscore += score.LAST_NAME;
    }
    if(crm.clientFirstName  === ppa.FIRST_NAME){
        totalscore += score.FIRST_NAME;
    }
    if(crm.clientDateOfBirth  === ppa.BIRTHDATE){
        totalscore += score.DOB;
    }
    if(crm.clientGender  === gender){
        totalscore += score.GENDER;
    }
    if(crm.clientHomeAddress1  === ppa.STREET){
        totalscore += score.ADDRESS1;
    }
    if(crm.clientHomeCity  === ppa.CITY){
        totalscore += score.CITY;
    }
    if(crm.clientHomeState  === ppa.STATE){
        totalscore += score.STATE;
    }
    if(crm.clientHomeZip  === ppa.ZIP_CODE){
        totalscore += score.ZIP;
    }
    if(crm.clientHomePhone  === ppa.HOME_PHONE){
        totalscore += score.HOME_PHONE;
    }
    if(crm.clientMobilePhone  === ppa.CELL_PHONE){
        totalscore += score.MOBILE;
    }
    if(crm.clientEmail1  === ppa.EMAIL){
        totalscore += score.EMAIL;
    }
    
    return totalscore;
}

module.exports = processppa;