var mongoose = require('mongoose');

var SubmissionSchema = new mongoose.Schema({
    username: String,
    asgn: String,
    submitted: {
        type: Date,
        default: Date.now,
    },
    graded: Boolean,
});

var Submission = mongoose.model('Submission', SubmissionSchema);
module.exports = Submission;

