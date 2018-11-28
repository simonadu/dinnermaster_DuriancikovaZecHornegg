var express = require('express');
var router = express.Router();

var users = require('../models/users');

var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

/*router.post('/', (req, res) => {
  const { username, password } = req.body;
  console.log('User submitted: ', username, password);

  //db.user
  //  .findOne({
  //    where: { username: username }
  //  })
  users.getUserByUsername(username, null).then(user => {
    console.log('User Found: ', user);
    if (user === null) {
      res.json(false);
    }
    bcrypt.compare(password, user.password, function(err, result) {
      if (result === true) {
        console.log('Valid!');
        let token = jwt.sign(
          { username: user.username },
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
  });
});*/

router.post('/', (req, res, next) => {
  //const { username, password } = req.body;

  // GET USER BY EMAIL
  // router.post('/check', function(req, res, next) {

  // 	user.checkUser(req.body, function (err, rows) {

  // 		if( err ){
  // 			res.json(err);
  // 		} else{
  // 			res.json(rows);
  // 		}
  // 	})
  // });

  const username = req.body.username;
  const password = req.body.password;

  users.getUserByUsername(username, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      //res.json(rows);
      /*
      console.log(rows);
      rows => {*/
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
