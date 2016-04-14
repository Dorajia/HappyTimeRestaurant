var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
order_id: Number,
user_name:String,
order_time:Date,
confirm_time:Date,
restaurant_name:String,
delivery_address:
{
    street:String,
    city:String,
    state:String,
    zip:Number
},
dishes: [{
dish_name:String,
dish_pic:{ data: Buffer, contentType: String },
dish_price:Number,
number:Number
}]

});

module.exports = mongoose.model('order', OrderSchema);