var express = require('express');
var router = express.Router();
var users = require('../models/users');

const bcrypt = require('bcrypt');
const saltRounds = 10;

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

    const password = req.body.password;
    
    bcrypt.hash(password, saltRounds, function(err, hash) {
        users.adduser(req.body, hash, function(err, count) {
            if (err) {
                res.json(err);
            } else {
                res.json(req.body); //or return count for 1 & 0
            }
        });
    });
});

router.delete('/:id', function(req, res, next) {
    users.deleteuser(req.params.id, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.put('/:id', function(req, res, next) {
    users.updateuser(req.params.id, req.body, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;