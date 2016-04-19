var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var DeliverySchema = new mongoose.Schema(
	{
		state:String,
		zipcode:Number,
		address:String
	});

var UserSchema = new Schema({
   _id: {
        type: String,
        required: true
    },
  password: {
        type: String,
        required: true
    },
  email:String,
  phone:[{_id: Number}],
  delivery_address:[DeliverySchema]
});


UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

UserSchema.methods.encrptPassword = function(newpass,cb){
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return cb(err);
            }
            bcrypt.hash(newpass, salt, function (err, hash) {
                if (err) {
                    return cb(err);
                }
           cb(null, hash);
            });
        });
};
 
module.exports = mongoose.model('User', UserSchema, 'user');