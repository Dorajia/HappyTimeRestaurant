var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var branchSchema = new Schema(
{
	_id: Number, //zipcode
	branch_name:String,
    branch_address:
		{street:String,
		city:String,
		state:String,
		zip:String},
    branch_phone: String
        
});

module.exports = mongoose.model('branch', branchSchema, 'branch');