var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('./models/user');

var upload = require('./controllers/upload.js');
var results = require('./controllers/results.js');
var register = require('./controllers/register.js');
var login = require('./controllers/login.js');
var profile = require('./controllers/profile.js');
var mainpage = require('./controllers/mainpage.js');
var api = require('./controllers/api.js');
var admin = require('./controllers/admin.js');

function requiresLogin(req, res, next) {
    if(req.session && req.session.userId) return next();
    return res.status(401).sendFile(path.join(__dirname, '/client/notlogin.html'));
}

function requiresAdmin(req, res, next) {
    if(req.session && req.session.admin) return next();
    return res.status(401).sendFile(path.join(__dirname, '/client/notauth.html'));
}

router.get('/', mainpage.get);
router.post('/', mainpage.post);

router.get('/api/**', api.get);
router.get('/api', api.get);

router.get('/logout', login.logout);
router.get('/passchange', requiresAdmin, login.view.cp);
router.post('/passchange', requiresAdmin, login.cp);

router.get('/profile', profile.show_user);

router.get('/admin', requiresAdmin, admin.view);
router.get('/gradebook/:ASGN', requiresAdmin, admin.gradebook);

router.post('/upload/:ASGN', upload.upload_a_file);
router.get('/upload/:ASGN', requiresLogin, upload.view);
router.get('/upload', requiresLogin, upload.queue);

router.get('/results/:ASGN', requiresLogin, results.view);

router.get('/success', function(req, res) {
    res.sendFile(path.join(__dirname, '/client/success.html'));
});

router.get('/fail', function(req, res) {
    res.sendFile(path.join(__dirname, '/client/fail.html'));
});

router.post('/update/:ASGN/:USERNAME', results.post);

// API
router.get('/assignments', profile.get_assignments);
router.get('/submissions', results.get_submissions);
router.get('/students', admin.get_students);

router.get('/recent/:ASGN', results.most_recent);
router.get('/recent/:ASGN/:USERNAME', requiresAdmin, results.most_recent);

module.exports = router;
