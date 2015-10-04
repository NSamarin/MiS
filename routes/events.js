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
    res.json(sample);
    var sqlite3 = require('sqlite3').verbose();  
    var db = new sqlite3.Database('abcd');  
    var e=req.body.number;
    console.log(e);
    db.serialize(function() {  
    db.run("CREATE TABLE if not exists events (id INTEGER PRIMARY KEY, company_name TEXT,event_name TEXT, discount REAL, date TEXT, min_number INT, expiration INT)");  
  
    var stmt = db.prepare("INSERT INTO events(company_name,event_name,discount,date,min_number, expiration) VALUES (?,?,?,?,?,?)");   
    var a=req.body.company; 
    var b=req.body.name;
    var c=req.body.discount;
    var d=req.body.dates;
    var e=req.body.number;
    var f=req.body.expires;
    stmt.run(a,b,c,d,e,f);   
    stmt.finalize(); console.log("req number: "+f);
    db.each("SELECT id, company_name,event_name,discount,date,min_number, expiration FROM events", function(err, row) {  
     console.log("Events: : "+row.id,row.company_name, row.event_name,row.discount,row.date,row.min_number,row.expiration);  
    });  
   });  
  
db.close();  

});

module.exports = router;
