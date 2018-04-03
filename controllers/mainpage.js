var register = require('./register.js');
var login = require('./login.js');
var path = require('path');

exports.get = function(req, res) {
    if(req.session && req.session.userId) return res.redirect('/profile');
    return res.sendFile(path.join(__dirname, '/../client/index.html'));
};

exports.post = function(req, res) {
    if(req.body.email) register(req, res);
    else login.login(req, res);
};

