var path = require('path');
var bcrypt = require('bcrypt');

var User = require('../models/user');

exports.login = function(req, res) {
    var body = req.body;
    if(!(body.logemail && body.logpassword)) {
        return res.send('missing username or password <br> <a href="/"> back home </a>');
    }
    User.authenticate(body.logemail, body.logpassword, function(err, user) {
        if(err || !user) {
            console.log(err);
            return res.send('wrong email or password <br> <a href="/"> back home </a>');
        } else {
            req.session.userId = user._id;
            req.session.email = user.email;
            req.session.username = user.email.split("@")[0];
            req.session.admin = user.admin;
            return res.redirect('/profile');
        }
    });
};

exports.logout = function(req, res) {
    if(req.session) {
        req.session.destroy(function(err) {
            if(err) return console.log(err);
            return res.redirect('/');
        });
        return;
    }
    return res.redirect('/');
};

exports.view = {};

exports.view.cp = function(req, res) {
    return res.sendFile(path.join(__dirname, '/../client/passchange.html'));
};

exports.cp = function(req, res) {
    var body = req.body;

    if(body.passwordConf !== body. password) {
        return res.send('passwords do not match <br> <a href="/"> back home </a>');
    }

    User.find({email: body.email}, function(err, data) {
        if(err) {
            return res.send('error in database <br> <a href="/"> back home </a>');
        }
        bcrypt.hash(body.password, 10, function(err, hash) {
            if(err) throw err;
            User.findOneAndUpdate({email: body.email}, {password: hash, passwordConf: hash}, function(err, data) {
                return res.redirect('/success');
            });
        });
    });
};
