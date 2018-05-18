var User = require('../models/user');
var path = require('path');

exports.show_user = function(req, res) {
    if(!req.session) return res.status(401).sendFile(path.join(__dirname, '/../client/nologin.html'));
    return res.render('userprofile', {
        email: req.session.email
    });
};

exports.get_assignments = function(req, res) {
    return res.send(["Player", "People", "Notebook", "Flashlight", "Stuffie"]);
};

