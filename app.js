var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongo = require('mongodb');
var bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var dbConn = mongo.MongoClient.connect('mongodb://localhost:27017');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));

app.post('/post-submit', function (req, res) {
    dbConn.then(function(db) {
        var dbo = db.db("bcclub");
        delete req.body._id; // for safety reasons
        dbo.collection('userData').insertOne(req.body);
    });
    res.send('Data received:\n' + JSON.stringify(req.body));
    console.log("1 Data inserted");
});
app.post('/post-subscribe', function (req, res) {
    dbConn.then(function(db) {
        var dbo = db.db("bcclub");
        delete req.body._id; // for safety reasons
        dbo.collection('subscriberData').insertOne(req.body);
    });
    res.send('Data received:\n' + JSON.stringify(req.body));
    console.log("1 Data inserted");
});
app.post('/post-mail', function (req, res) {
    dbConn.then(function(db) {
        var dbo = db.db("bcclub");
        delete req.body._id; // for safety reasons
        dbo.collection('mailData').insertOne(req.body);
    });
    res.send('Data received:\n' + JSON.stringify(req.body));
    console.log("1 Data inserted");
});
app.post('/post-conference', function (req, res) {
    dbConn.then(function(db) {
        var dbo = db.db("bcclub");
        delete req.body._id; // for safety reasons
        dbo.collection('conferenceData').insertOne(req.body);
    });
    res.send('Data received:\n' + JSON.stringify(req.body));
    console.log("1 Data inserted");
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0' );
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
