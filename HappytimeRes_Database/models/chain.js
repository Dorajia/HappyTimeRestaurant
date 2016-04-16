var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chainSchema = new Schema(
{
	chainRest_id: Number,
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