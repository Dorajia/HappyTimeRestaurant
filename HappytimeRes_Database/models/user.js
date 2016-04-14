var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema(
{
	user_SKU:Number,
	user_name: String,
	password:String,
	email_address:String,
	phone_number:[Number],
	delivery_address:
	[
		{street:String,
		city:String,
		state:String,
		zip:String}
	]
	
});

module.exports = mongoose.model('user', UserSchema);