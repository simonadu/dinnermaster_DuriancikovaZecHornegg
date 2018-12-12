var express = require('express');
var router = express.Router();
var guests = require('../models/guests');


router.get('/dinner/:id?', function(req, res, next) {
    guests.getGuestsByDinner(req.params.id, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.get('/guest/:id?', function(req, res, next) {
    guests.getGuestbyGuestId(req.params.id, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.get('/visited/:id?', function(req,res,next){
    guests.getVisitedDinners(req.params.id, function(err,count) {
        if(err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.get('/guestId/:dinner_id/:user_id', function(req,res,next){
    guests.getGuestIdByDinnerAndUser(req.params.dinner_id,req.params.user_id, function(err,count) {
        if(err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.post('/', function(req, res, next){
    guests.addGuest(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body); //or return count for 1 & 0
        }
    });
});

router.delete('/:id', function(req, res, next) {
    guests.deleteGuest(req.params.id, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.put('/:id', function(req, res, next) {
    guests.updateGuestGrade(req.params.id, req.body, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
