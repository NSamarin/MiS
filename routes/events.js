var express = require('express');
var router = express.Router();

var sample = [
    {
        "company": "Ghost Tours",
        "name": "Ghost Tours - 10% Discount",
        "dates": {
            "Monday": ["15:30", "18:30"],
            "Wednesday": ["11:30", "19:45"],
            "Friday": ["22:00"]
        },
        "discount": 0.1,
        "number": 20,
        "expires": 3

    },
    {
        "company": "Ghost Tours",
        "name": "Ghost Tours - 20% Discount",
        "dates": {
            "Tuesday": ["15:30", "18:30"],
            "Sunday": ["11:30", "19:45"]
        },
        "discount": 0.2,
        "number": 40,
        "expires": 5
    },
    {
        "company": "Family Tours",
        "name": "Family Tours - 20% Discount",
        "dates": {
            "Sunday": ["15:30", "18:30"],
            "Wednesday": ["11:30", "19:45"],
            "Friday": ["22:00"]
        },
        "discount": 0.2,
        "number": 20,
        "expires": 5

    },
    {
        "company": "Family Tours",
        "name": "Family Tours - 30% Discount",
        "dates": {
            "Thursday": ["11:30", "19:45"],
            "Friday": ["22:00"]
        },
        "discount": 0.3,
        "number": 50,
        "expires": 10
    }
];


/* GET user events */
router.get('/', function (req, res, next) {
    res.json(sample);
});

/* POST user events */
router.post('/', function (req, res, next) {
    console.log("ping from post");
    console.log(req.body.name);
    res.json(sample);
});

module.exports = router;
