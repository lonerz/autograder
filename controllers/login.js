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

