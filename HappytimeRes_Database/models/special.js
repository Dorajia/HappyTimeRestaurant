var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpecialSchema = new Schema(
{
	_id: Number,
	special_dish: {type:String, ref:'dish'}
});

module.exports = mongoose.model('special', SpecialSchema,'special');