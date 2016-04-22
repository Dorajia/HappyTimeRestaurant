var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

module.exports = mongoose.model('cart', CartSchema,'cart');