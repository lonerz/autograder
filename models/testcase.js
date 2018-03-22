var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TestCaseSchema = new Schema({
    testcase: Number,
    correct: Number,
});

module.exports = mongoose.model('TestCase', TestCaseSchema);


