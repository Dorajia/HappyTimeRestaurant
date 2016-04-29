var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paycardSchema = new Schema(
{
	user_name:String,
    card_type:String,
    card_holder:String,
	card_number:Number,
    expire_date: String,
    bank_name:String
});

module.exports = mongoose.model('paycard', paycardSchema, 'paycard');