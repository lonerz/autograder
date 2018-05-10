var path = require('path');
var request = require('request');

var User = require('../models/user');
var Submission = require('../models/submission');

exports.view = function(req, res) {
    return res.render('admin', {
        email: req.session.email,
    });
};

exports.get_students = function(req, res) {
    User.find({}, {'email': 1, '_id': 0}, function(err, data) {
        if(err) {
            console.log(err);
            return;
        }
        data.sort();
        usernames = [];
        data.forEach(function(obj) {
            usernames.push(obj.email.split('@')[0]);
        });
        res.send(usernames);
    });
};

exports.gradebook = function(req, res) {
    return res.render('gradebook', {
        email: req.session.email,
        asgn: req.params.ASGN,
    });
};

