var routes = function(app) {
    var controllers = require('./controllers.js');

    app.route('/upload').post(controllers.upload_a_file);
    app.route('/results').get(controllers.get_results);
};

module.exports = routes;
