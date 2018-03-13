var express = require('express');
var app = express();
var mongoose = require('mongoose');
var DBurl = "mongodb://127.0.0.1:27017/autograder";
var bodyParser = require('body-parser');
var TestCase = require('./api/models.js');
var path = require('path');

mongoose.Promise = global.Promise;
mongoose.connect(DBurl);
var db = mongoose.connection;

db.once('open', function() {
    console.log("DB successfully connected!");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/js', express.static(__dirname + '/client/js'));

// templates
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'templates'));

// testing purposes
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

var routes = require('./api/routes');
routes(app);

app.listen(8000);
console.log("API is running on port 8000");

var pug = require('pug');


