var mongoose = require('mongoose');
var TestCase = mongoose.model('TestCase');
var formidable = require('formidable');
var fs = require('fs');

exports.upload_a_file = function(req, res) {
    var form = new formidable.IncomingForm();
    // form.uploadDir = __dirname + '/../upload';
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        var oldpath = files.upload.path;
        var newpath = __dirname + "/../upload/" + files.upload.name;
        fs.rename(oldpath, newpath, function (err) {
            if(err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('File uploaded!');
            res.write('</br>');
            res.write('<a href="http://localhost:8000"> return back to home </a>');
            res.end();
        });
    });
};

exports.get_results = function(req, res) {
    /*
    var testcase = new TestCase({
        testcase: 2,
        correct: 1
    });
    testcase.save(function(err, data) {
        if(err) throw err;
        console.log(data);
    });
    */
    TestCase.find({}, function(err, data) {
        if(err) throw err;
        console.log(data);
        var results = [];
        for (t in data) {
            console.log(data[t]);
            if(data[t].correct === 1) results.push("Test Case " + data[t].testcase + " is correct!");
            else results.push("Test Case " + data[t].testcase + " is incorrect!");
        }
        console.log(results);
        res.render('results', {
            abc: results.join()
        });
    });
};

