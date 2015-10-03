var express = require('express');
var router = express.Router();

var sample = [
  {
    "name": "Ghost Tour 1",
    "dates": [{
      "Monday": ["15:30", "18:30"],
      "Wednesday": ["11:30", "19:45"],
      "Friday": ["22:00"]
    }],
    "discount": 0.1,
    "number": 20,
    "expires": 3

  },
  {
    "name": "Ghost Tour 2",
    "discount": 0.2,
    "number": 40,
    "expires": 5
  }
];


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(sample);
});

module.exports = router;