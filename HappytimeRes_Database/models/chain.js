var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chainSchema = new Schema(
{
	_id: Number, //zipcode
	chainRest_name:String,
    chainRest_address:
	[
		{street:String,
		city:String,
		state:String,
		zip:String}
	],
    chainRest_phone: [Number]
        
});

module.exports = mongoose.model('chain', chainSchema);