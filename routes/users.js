var express = require('express');
var router = express.Router();

var sample = [
  {
    "name": "Ghost Tour 1",
    "discount": 0.1,
    "number": 20,
    "expires": 3
  },
  {
    "name": "Ghost Tour 1",
    "discount": 0.2,
    "number": 40,
    "expires": 5
  }
];


/* GET users listing. */
router.get('/', function(req, res, next) {

  res

});

module.exports = router;
