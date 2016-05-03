var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeliverySchema = new Schema(
	{
	    _user: {type:String, ref:'user'},
		address1:String,
		address2:String,
		city: String,
		state:String,
		zipcode:Number,
	    receiver:String,
	    phone:Number,
	    isdefault: Boolean, default:0
	});
	
module.exports = mongoose.model('delivery', DeliverySchema, 'delivery');