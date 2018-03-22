var path = require('path');

var upload = require('./controllers/upload.js');
var results = require('./controllers/results.js');
var register = require('./controllers/register.js');

var routes = function(app) {

    app.route('/').get(function(req, res) {
        res.sendFile(path.join(__dirname, '/client/index.html'));
    });
    app.route('/').post(function(req, res) {
        console.log(req.body);
        res.end();
    });

    app.route('/upload').post(upload.upload_a_file);
    app.route('/upload').get(function(req, res) {
        res.sendFile(path.join(__dirname, '/client/upload.html'));
    });

    app.route('/results').get(results.get_results);

    app.route('/success').get(function(req, res) {
        res.sendFile(path.join(__dirname, '/client/success.html'));
    });

    app.route('/fail').get(function(req, res) {
        res.sendFile(path.join(__dirname, '/client/fail.html'));
    });

    app.route('/update').post(function(req, res) {
        console.log(req.headers);
        res.write("yay");
        res.send();
    });
};

module.exports = routes;
