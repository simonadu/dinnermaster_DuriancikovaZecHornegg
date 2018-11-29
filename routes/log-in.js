var express = require('express');
var router = express.Router();

var users = require('../models/users');

var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
  const username = req.body.username;

  users.getUserByUsername(username, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      const password = req.body.password;

      bcrypt.compare(password, rows[0].password, function(err, result) {
        if (result === true) {
          console.log('Valid!');
          let token = jwt.sign(
            { username: rows.username },
            'keyboard cat 4 ever',
            { expiresIn: 129600 }
          ); // Signing the token
          res.json({
            sucess: true,
            err: null,
            token
          });
        } else {
          console.log('Entered Password and Hash do not match!');
          res.status(401).json({
            sucess: false,
            token: null,
            err: 'Entered Password and Hash do not match!'
          });
        }
      });
      /*};*/
    }
  });
});

module.exports = router;
