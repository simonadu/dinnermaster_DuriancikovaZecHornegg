var express = require('express');
var router = express.Router();
var dinners = require('../models/dinners');

router.get('/:id?', function(req, res, next) {
    if (req.params.id) {
        dinners.getdinnerBydinner_id(req.params.id, function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        dinners.getUpToDateDinners(function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});

router.get ('/all', function (req, res, next){
    dinners.getAlldinners(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.post('/', function(req, res, next) {
    dinners.adddinner(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body); //or return count for 1 & 0
        }
    });
});

router.get('/user/:id?', function(req, res, next) {
    dinners.getdinnersByuser_id(req.params.id, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.delete('/:id', function(req, res, next) {
    dinners.deletedinner(req.params.id, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.put('/:id', function(req, res, next) {
    dinners.updatedinner(req.params.id, req.body, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.put('/guests/:id', function (req,res,next) {
    dinners.addGuest(req.params.id, req.body, function(err,rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;