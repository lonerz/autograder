var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    passwordConf: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});

UserSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if(err) {
            return next(err);
        }
        user.password = hash;
        user.passwordConf = hash;
        next();
    });
});

UserSchema.statics.authenticate = function(email, password, callback) {
    User.findOne({ email: email }, function(err, user) {
        if(err) {
            return callback(err);
        } else if (!user) {
            var err = new Error('User not found!');
            err.status = 401;
            return callback(err);
        }
        bcrypt.compare(password, user.password, function(err, res) {
            if(res) return callback(null, user);
            else return callback();
        });
    });
};

var User = mongoose.model('User', UserSchema);
module.exports = User;

