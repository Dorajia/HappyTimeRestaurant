var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpecialSchema = new Schema(
{
	_id: String,
	recommended_dish: [{type:String, ref:'dish'}]
});

module.exports = mongoose.model('special', SpecialSchema,'special');