var User = require('../models/user');

module.exports = function(req, res) {
    var body = req.body;
    if(body.password !== body.passwordConf) {
        res.send("passwords dont match <br> <a href='/'> back home </a>");
        return;
    }

    if(!body.email.includes("@")) {
        res.send("invalid email <br> <a href='/'> back home </a>");
        return;
    }

    var adminEmails = ["joshuapan@proofschool.org", "klin@proofschool.org"];
    if(body.email && body.password && body.passwordConf) {
        var userData = {
            email: body.email,
            password: body.password,
            passwordConf: body.passwordConf,
            admin: false
        };

        if(adminEmails.includes(body.email)) {
            userData['admin'] = true;
        }

        User.create(userData, function(err, user) {
            if(err) {
                console.log(err.message);
                return res.send("email already taken <br> <a href='/'> back home </a>");
            }
            req.session.userId = user._id;
            req.session.username = user.email.split('@')[0];
            res.redirect('/');
        });
    }
};

