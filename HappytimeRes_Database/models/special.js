var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpecialSchema = new Schema(
{
	special_id: Number,
	recommended_dish: 
	[
		{dish_name:String,
		dish_picture:'',
		dish_price:Number,
		dish_description:String,
		catalog_name:String,
		dish_soldout:Boolean}
	]
	
});

module.exports = mongoose.model('special', SpecialSchema);