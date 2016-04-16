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
	phone_number:[{_id: Number}],
	delivery_address:[DeliverySchema]
});

module.exports = mongoose.model('user', UserSchema,'user');