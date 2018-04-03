var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();
var DBurl = "mongodb://127.0.0.1:27017/autograder";
var User = require('./models/user.js');

// connect mongodb
mongoose.Promise = global.Promise;
mongoose.connect(DBurl);
var db = mongoose.connection;

db.once('open', function() {
    console.log("DB successfully connected!");
});

// middleware stuff + debug statements
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use('/js', express.static(path.join(__dirname, '/client/js')));

// sessions
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

// cors
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'Options') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
        return res.status(200).json({});
    }
    next();
});

// templates
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'templates'));

// routes
var routes = require('./routes');
app.use('/', routes);
// routes(app);

app.listen(8000, function() {
    console.log("Server is running on port 8000");
});


