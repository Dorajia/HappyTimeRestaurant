var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment-timezone');

var OrderSchema = new Schema({
    _id:String,
    user: String,
    order_time:String,
    confirm_time: { type: String, default:null},
    restaurant_name: String,
    delivery_address:[],
    dishes: [],
    card:[],
    total_price: Number
    });

OrderSchema.pre('save', function (next) {
	 var format = 'YYYY/MM/DD HH:mm:ss ZZ';
     this.order_time = moment().tz("America/Los_Angeles").format(format).toString();
    next();
});

module.exports = mongoose.model('order', OrderSchema,'order');