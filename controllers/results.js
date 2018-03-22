var mongoose = require('mongoose');
var TestCase = require('../models/testcase');

exports.get_results = function(req, res) {
    /*
    var testcase = new TestCase({
        testcase: 3,
        correct: 1
    });
    testcase.save(function(err, data) {
        if(err) throw err;
        console.log(data);
    });
    */
    TestCase.find({}, function(err, data) {
        if(err) throw err;
        console.log(data);
        var results = [];
        for (t in data) {
            console.log(data[t]);
            if(data[t].correct === 1) results.push("Test Case " + data[t].testcase + " is correct!");
            else results.push("Test Case " + data[t].testcase + " is incorrect!");
        }
        res.render('results', {
            abc: results.join(" ")
        });
    });
};

