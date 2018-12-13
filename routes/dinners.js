var express = require('express');
var router = express.Router();
var dinners = require('../models/dinners');

router.get('/:id?', function(req, res, next) {
  if (req.params.id) {
    dinners.getDinnerByDinner_id(req.params.id, function(err, rows) {
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

router.get('/userid/:id', function(req, res, next) {
  dinners.getUserByDinner_id(req.params.id, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.get('/three/newest/', function(req, res, next) {
    dinners.getNewestDinners(function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});


router.post('/', function(req, res, next) {
  dinners.addDinner(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});

router.get('/user/:id?', function(req, res, next) {
  dinners.getDinnersByUser_id(req.params.id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

router.delete('/:id', function(req, res, next) {
  dinners.deleteDinner(req.params.id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

router.put('/:id', function(req, res, next) {
  dinners.updateDinner(req.params.id, req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.put('/guests/:id', function(req, res, next) {
  dinners.addGuest(req.params.id, req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.put('/rating/:id', function(req, res, next) {
    dinners.dinnerRating(req.params.id, req.body, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.put('/decrement/:id', function(req, res, next) {
    dinners.decrementGuest(req.params.id, req.body, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
