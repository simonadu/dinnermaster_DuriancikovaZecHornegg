var express = require('express');
var router = express.Router();
var users = require('../models/users');

router.get('/:id?', function(req, res, next) {
    if (req.params.id) {
        users.getuserByuser_id(req.params.id, function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        users.getAllusers(function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});

router.post('/', function(req, res, next) {
    users.adduser(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body); //or return count for 1 & 0
        }
    });
});

module.exports = router;