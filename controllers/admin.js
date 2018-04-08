var path = require('path');

exports.view = function(req, res) {
    return res.render('admin', {
        email: req.session.email,
    });
};

exports.gradebook = function(req, res) {
    return res.send("Looking at the grades for assignment: " + req.params.ASGN + ". This feature is to be implemented :) <a href='/admin'>back</a>");
};

