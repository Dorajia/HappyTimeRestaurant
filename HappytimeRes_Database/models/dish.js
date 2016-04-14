var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DishSchema = new Schema(
{
	dish_name:String,
	dish_picture:{ data: Buffer, contentType: String },
	dish_price:Number,
	dish_description:String,
	dish_soldout:Boolean()
});

module.exports = mongoose.model('dish', DishSchema);