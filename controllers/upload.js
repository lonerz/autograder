var formidable = require('formidable');
var fs = require('fs');
var request = require('request');
var path = require('path');
var copy = require('copy');

var Submission = require('../models/submission');

function findsub(req, res) {
    Submission.find({
        username: req.session.username,
        asgn: req.params.ASGN,
        graded: false
    }, function (err, data) {
        if(err) {
            console.log(err);
            return res.redirect('/fail');
        }
        console.log(data);
        if(data.length) {
            return res.send("already have a submission for this assignment <br> <a href='/'> back home </a>");
        }
        createsub(req, res);
    });
}

function sendjob(req, res, db_id) {
    // send JOB
    request.post({url: 'http://localhost:3000/addJob/' + req.session.username + '/' + req.params.ASGN + '/',
        json: {
            "files":
                [{"destFile": "grader.py", "localFile": "grader.py"},
                {"destFile": "Makefile", "localFile": "autograde-Makefile"},
                {"destFile": "handin.py", "localFile": "handin.py"}],
            "callback_url": "http://localhost:8000/update/" + req.params.ASGN + '/' + req.session.username + '/', // req.session.username + '/' + req.params.ASGN + '/',
            "image": "autograding_image",
            "output_file": db_id + ".out",
            "jobName": db_id,
            "timeout": 0,
            "accessKeyId": "",
            "max_kb": 0,
            "accessKey": "",
        }
    }, function(err, resp, body) {
        if(body && body.statusMsg === 'Job added') {
            return res.redirect('/upload');
        }
        if(err) console.log(err);
        return res.redirect('/fail');
    });
}

function createsub(req, res) {
    var subdata = {
        username: req.session.username,
        asgn: req.params.ASGN,
        graded: false,
    };
    Submission.create(subdata, function(err, data) {
        if(err) {
            console.log(err);
            return res.send("error adding submission to database <br> <a href='/'> back home </a>");
        }
        console.log("NEW SUBMISSION: ", data);
        return sendjob(req, res, data._id);
    });
}

function copyFiles(req, res) {
    var oldpath = __dirname + "/../../Tango/courselabs/joshuapan-" + req.params.ASGN; // + "/grader.py";
    var newpath = __dirname + "/../../Tango/courselabs/" + req.session.username + "-" + req.params.ASGN; // + "/grader.py";
    fs.copyFile(oldpath + "/grader.py", newpath + "/grader.py", function(err) {
        if (err) {
            console.log(err);
            return res.send("error copying grader.py <br> <a href='/'> back home </a>");
        }
        fs.copyFile(oldpath + "/autograde-Makefile", newpath + "/autograde-Makefile", function(err) {
            if (err) {
                console.log(err);
                return res.send("error copying autograde-Makefile <br> <a href='/'> back home </a>");
            }
            findsub(req, res);
        });
    });
}

function success_upload(req, res) {
    copyFiles(req, res);
}

exports.upload_a_file = function(req, res) {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        if(files.upload.type !== 'text/x-python-script') {
            return res.redirect('/fail');
        }
        var oldpath = files.upload.path;
        var newpath = __dirname + "/../../Tango/courselabs/" + req.session.username + "-" + req.params.ASGN + "/handin.py"; // + files.upload.name;
        fs.rename(oldpath, newpath, function (err) {
            if(err) {
                console.log(err);
                return res.redirect('/fail');
            }
            success_upload(req, res);
        });
    });
};

exports.view = function(req, res) {
    return res.render('upload', {
        link: req.params.ASGN,
        email: req.session.email,
    });
};

exports.queue = function(req, res) {
    return res.render('queue', {
        email: req.session.email
    });
};

