var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var Cart = require('./cart');

var DeliverySchema = new mongoose.Schema(
	{
		address1:String,
		address2:String,
		city: String,
		state:String,
		zipcode:Number,
	    receiver:String,
	    phone:Number,
	    isdefault: Boolean, default:0
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

UserSchema.post('save', function(next) {
   var user = this;
   var newCart = new Cart({
    _id: user._id,
    status: 'Empty',
    total_price:0
    });
    newCart.save(function(err) {
      if (err) {
        return next(err);
      }
    });
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