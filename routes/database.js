//NB! Sample file, could be used for reference


////Database connection implemented here
//
//var mysql = require('mysql');
//
//
////connection pool
//var pool = mysql.createPool({
//    connectionLimit: 100, //important
//    host: host,
//    user: user,
//    password: pass,
//    database: db,
//    debug: false
//});
//
////handle db query requests
//exports.handle_database = function (req, res, query, params, callback) {
//
//    pool.getConnection(function (err, connection) {
//        if (err) {
//            if (connection) connection.release();
//            console.log(err);
//            //callback(null);
//            res.json({"code": 100, "status": "Error in connection database"});
//            return;
//        }
//
//        console.log('connected as id ' + connection.threadId);
//
//        //console.log(query);
//
//        connection.query(query, params, function (err, rows) {
//            connection.release();
//            if (err) {
//                console.log(err);
//                res.json({"code": 100, "status": "Error in connection database"});
//                return;
//            }
//            callback(rows);
//        });
//
//        connection.on('error', function (err) {
//            console.log(err);
//            //callback(null);
//            res.json({"code": 100, "status": "Error in connection database"});
//            return;
//        });
//    });
//};
