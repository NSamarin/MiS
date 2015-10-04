var express = require('express');
var router = express.Router();

<<<<<<< HEAD
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

router.get('/', function (req, res, next) {
      var results=[];
      var pg = require('pg');
    console.log(req.body.name);
DATABASE_URL='postgres://qxvgprniwlpgjm:HbD3NYtAQdFL7xk5eRjzxRZ7eD@ec2-54-83-51-38.compute-1.amazonaws.com:5432/da85113i577oud?ssl=true'

pg.connect(DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');
  client.query("CREATE TABLE IF NOT EXISTS events(name varchar(64), dates varchar(64),discount float, number int)");
  //client.query("INSERT INTO events(name,dates,discount,number) values($1,$2,$3,$4)",["a","oct",23,4]);
  var query = client.query("SELECT name,dates,discount,number from events");
   query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
            client.end();
            return res.json(results);
        });

=======
/* GET user events */
router.get('/', function (req, res, next) {
    res.json({
        id: 15,
        name: "Test Tour 1",
        date: "Monday - 10:30",
        discount: 0.2,
        number: 20
    })
>>>>>>> 021aee217aa6278df375de6c91d82ed892e38151
});
 

});
router.post('/', function (req, res, next) {
<<<<<<< HEAD
 /*   var pg = require('pg');
    console.log(req.body.name);
DATABASE_URL='postgres://qxvgprniwlpgjm:HbD3NYtAQdFL7xk5eRjzxRZ7eD@ec2-54-83-51-38.compute-1.amazonaws.com:5432/da85113i577oud?ssl=true'

pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');
  client.query("CREATE TABLE IF NOT EXISTS events(firstname varchar(64), lastname varchar(64))");
  var x=req.body.name;
  client.query("INSERT INTO events(firstname, lastname) values($1, $2)", [x, 'Ganesh']);
=======
    console.log("ping from post");
    res.json("success");
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
     //console.log("Events: : "+row.id,row.company_name, row.event_name,row.discount,row.date,row.min_number,row.expiration);
    });
   });  
  
db.close();  
>>>>>>> 021aee217aa6278df375de6c91d82ed892e38151

  var query = client.query("SELECT firstname, lastname FROM evs ORDER BY lastname, firstname");
   query.on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});
    res.json(sample); */
});
   

module.exports = router;
