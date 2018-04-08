module.exports = function(req, res) {
    if(req.session) {
        req.session.destroy(function(err) {
            if(err) return console.log(err);
            return res.redirect('/');
        });
        return;
    }
    return res.redirect('/');
};

