var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Order = require('./order')

var OrderDishSchema = new mongoose.Schema(
    {
    	dish_name: String,
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
    order_id: '',
    user: this._id,
    restaurant_name:restaurant,
    $push:{delivery_address:{street:street,city:city,state:state,zip:zip}},
    phone:phone,
    dishes:[this.dish],
    total_price:this.total_price
    });
    newOrder.save(function(data,err) {
      if (err) {
          return cb(err);
      }
      else{
         this.findOneAndRemove({_id:this._id});
         return cb(null, data);
      }
    });
};


module.exports = mongoose.model('cart', CartSchema,'cart');