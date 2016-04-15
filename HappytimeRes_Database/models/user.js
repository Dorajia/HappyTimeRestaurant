var mongoose = require('mongoose');

var DeliverySchema = new mongoose.Schema(
	{
		state:String,
		zipcode:Number,
		address:String,
		user_name: {type:String, ref:'user'}
	});

var UserSchema = new mongoose.Schema(
{
	_id: String,
	password:String,
	email_address:String,
	phone_number:[Number],
	delivery_address:[DeliverySchema]
});

var delivery_address=mongoose.model('delivery', DeliverySchema,'delivery');
module.exports = mongoose.model('user', UserSchema,'user');