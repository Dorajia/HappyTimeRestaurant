var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    _user:{type:String, ref:'user'},
    user: String,
    order_time: { type: Date, required: true, default: Date.now },
    confirm_time: { type: Date, required: true, default: Date.now },
    restaurant_name: String,
    delivery_address:
    {
        street:String,
        city:String,
        state:String,
        zip:Number
    },
    dishes: [{type:String, ref:'dish'}],
    });

module.exports = mongoose.model('order', OrderSchema,'order');