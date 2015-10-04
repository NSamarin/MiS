var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var venues = require('./routes/venues');
var events = require('./routes/events'); //manage user-created events
var about = require('./routes/about');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('port', process.env.PORT || 3000);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

//app.use('/events', routes); // remove if doesn't work

//app.get('/events', function(req, res){
//    res.render('index.html');
//});

app.use('/about', about);

app.use('/api/venues', venues);
app.use('/api/events', events);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));

//CREATE DATABASE

/*var sqlite3 = require('sqlite3').verbose();  
var db = new sqlite3.Database('abcd');  
  
db.serialize(function() {  
  db.run("CREATE TABLE if not exists user (id INT, dt TEXT)");  
  
  var stmt = db.prepare("INSERT INTO user VALUES (?,?)");  
  for (var i = 0; i < 10; i++) {  
    
  var d = new Date();  
  var n = d.toLocaleTimeString();  
  stmt.run(i, n);  
  }  
  stmt.finalize();  
  
  db.each("SELECT id, dt FROM user", function(err, row) {  
      console.log("User id : "+row.id, row.dt);  
  });  
});  
  
db.close();  
*/

module.exports = app;
