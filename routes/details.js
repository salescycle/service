var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = require('../common/connection-pool')
var details = require('../bot/repo/get-details')
var Promise = require('promise');

/* GET users listing. */
router.get('/:type/:baseleid', function(req, res, next) { 
    getDetails(req.params.type, req.params.baseleid)
        .then(getPlans)
        .then(function(detailList){
            res.send(detailList);
        });
});

function getDetails(type, baseleid){
    return details.getDetails(type, baseleid);
}

function getPlans(ppalist){
    var detailList = [];
    return new Promise(function(resolve, reject){
        var i = 0;
        ppalist.forEach(function(ppa){
            i++;
            details.getPlanDetails(ppa.clientId)
                .then(function (planDetails) {
                    var newppa = Object.assign({},ppa);
                    newppa['planList'] = Object.assign([],planDetails);
                    console.log(newppa);
                    detailList.push(newppa);
                    console.log('length' ,ppalist.length);
                    console.log('i ',i);
                    if(ppalist.length === i){
                        resolve(detailList);
                    }
            });
        } );
    });
}

module.exports = router;