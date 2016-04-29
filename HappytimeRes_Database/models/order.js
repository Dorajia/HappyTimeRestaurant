var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    _id: String,
    user: String,
    order_time: { type: Date, required: true, default: Date.now },
    confirm_time: { type: Date, default:null},
    restaurant_name: String,
    delivery_address:[],
    dishes: [],
    card:[],
    total_price: Number
    });


module.exports = mongoose.model('order', OrderSchema,'order');