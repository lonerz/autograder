var mongoose = require('mongoose');
var fs = require('fs');
var request = require('request');

var TestCase = require('../models/testcase');
var Submission = require('../models/submission');

function parsescore(text) {
    var obj = text.trim().split("\n");
    obj = obj[obj.length - 1];
    try {
        return JSON.parse(obj);
    } catch (e) {
        console.log(e);
        return null;
    }
}

exports.view = function(req, res) {
    return res.render('results', {
        email: req.session.email,
        asgn: req.params.ASGN
    });
};

exports.api_recent = function(req, res, data) {
    return res.send(data);
}

exports.most_recent = function(req, res) {
    Submission.find({
        username: req.session.username,
        asgn: req.params.ASGN,
        graded: true,
    }, null, {
        sort: '-submitted',
        limit: 1,
    }, function(err, data) {
        if(err) console.log(err);
        console.log("PULLING MOST RECENT SUB OF ", req.session.username, req.params.ASGN, data);
        if(!data) {
            return exports.api_recent(req, res, null);
        }
        fetch_results(req, res, data[0]);
    });
};

function fetch_results (req, res, job) {
    request.get({
        url: 'http://localhost:3000/poll/' + req.session.username + '/' + req.params.ASGN + '/' + job._id + '.out/'
    }, function(err, resp, body) {
        var score;
        console.log("POLL BODY RETURN ", body);
        if(body && body.statusMsg !== "Output file not found") score = parsescore(body);
        exports.api_recent(req, res, [score, job]);
    });
}

exports.get_results = function(req, res) {
    TestCase.find({}, function(err, data) {
        if(err) throw err;
        console.log(data);
        var results = [];
        for (t in data) {
            console.log(data[t]);
            if(data[t].correct === 1) results.push("Test Case " + data[t].testcase + " is correct!");
            else results.push("Test Case " + data[t].testcase + " is incorrect!");
        }
        res.render('results', {
            abc: results.join(" ")
        });
    });
};

exports.post = function(req, res) {
    Submission.findOneAndUpdate({username: req.params.USERNAME, asgn: req.params.ASGN, graded: false}, {graded: true}, function(err, data) {
        if(err) {
            console.log(err);
            res.send('error');
        }
        return res.send('updated');
    });
};

exports.get_submissions = function(req, res) {
    Submission.find({}, null, {sort: '-submitted', limit: 50}, function(err, data) {
        if(err) console.log(err);
        return res.send(data);
    });
};

