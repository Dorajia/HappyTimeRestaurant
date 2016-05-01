var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Order = require('./order');
var shortid = require('shortid');

var OrderDishSchema = new mongoose.Schema(
    {
    	_id: String,
    	dish_price: Number,
    	dish_number:{type: Number, default:1}
    });

var CartSchema = new Schema({
    _id: String,//it is the user name, since one user can only have one shopping cart
    dish: [OrderDishSchema],
    status: {type: String, default:'Empty'},
    total_price:{type:Number, default:0} 
    });

CartSchema.methods.placeOrder = function (restaurant,street,city,state,zip,phone,cb) {
    var newOrder = new Order({
    _id: shortid.generate(),
    user: this._id,
    restaurant_name:restaurant,
    $push:{delivery_address:{street:street,city:city,state:state,zip:zip}},
    phone:phone,
    dishes:[this.dish],
    total_price:this.total_price
    });
    newOrder.save(function(err,data) {
      if (err) {
        return cb(err);
      }
      else{
         return cb(null, data);
      }
    });
};


module.exports = mongoose.model('cart', CartSchema,'cart');