const express = require("express");
const router = express.Router();
const record = require("../models/records");
const async = require('async');

router.post('/getrecord', function(req, res, next) {
    async.parallel({
        Easy: function(callback) {
            record.find({'type':'Easy' },{'_id':0}).sort({'costtime': 1}).limit(1).exec(callback)
        },Medium: function(callback) {
            record.find({'type':'Medium' },{'_id':0}).sort({'costtime': 1}).limit(1).exec(callback)
        },Hard: function(callback) {
            record.find({'type':'Hard' },{'_id':0}).sort({'costtime': 1}).limit(1).exec(callback)
        },Very_Hard: function(callback) {
            record.find({'type':'Very hard' },{'_id':0}).sort({'costtime': 1}).limit(1).exec(callback)
        },Insane: function(callback) {
            record.find({'type':'Insane' },{'_id':0}).sort({'costtime': 1}).limit(1).exec(callback)
        },Inhuman: function(callback) {
            record.find({'type':'Inhuman' },{'_id':0}).sort({'costtime': 1}).limit(1).exec(callback)
        }
    }, function(err, results) {
        let check1=results.Easy==null//&&results.Medium==null&&results.Hard==null;
        //let check2=results.Very_Hard==null&&results.Insane==null&&results.Inhuman==null;
        if (err) {return next(err); } // Error in API usage.
        if (check1) { // No results.&&check2
            var err = new Error('record not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.send({ 
            title: 'record', 
            body: [results.Easy,results.Medium,results.Hard,results.Very_Hard,results.Insane,results.Inhuman]
        });
    });
});

//savedata
router.post('/savedata', function(req, res, next) {
    const record_data=new record({
        Id:req.body.gamer_id,
        type:req.body.choose_type,
        costtime:req.body.costtime
    });
    //存入資料
    record_data.save((err) => {
        if(err){return handleError(err);}
        else{res.send({'res':'success'})}
        // saved!
    });
})

//Export 該Router
module.exports = router