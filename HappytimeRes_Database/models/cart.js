var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderDishSchema = new mongoose.Schema(
    {
    	dish_name: String,
    	dish_price: Number,
    	dish_number:{type: Number, default:1}
    });

var CartSchema = new Schema({
    _id: String,
    dishes: [OrderDishSchema],
    status: Boolean,
    total_price:{Type:Number, default:0} 
    });

module.exports = mongoose.model('cart', CartSchema,'cart');