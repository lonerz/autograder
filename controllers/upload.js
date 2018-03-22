var formidable = require('formidable');
var fs = require('fs');

exports.upload_a_file = function(req, res) {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        if(files.upload.type !== 'text/x-python-script') {
            res.redirect('/fail');
            res.end();
            return;
        }
        console.log(files.upload);
        var oldpath = files.upload.path;
        var newpath = __dirname + "/../upload/" + files.upload.name;
        fs.rename(oldpath, newpath, function (err) {
            if(err) throw err;
            res.redirect('/success');
            res.end();
        });
    });
};

