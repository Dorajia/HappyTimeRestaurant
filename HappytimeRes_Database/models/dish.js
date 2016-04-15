var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DishSchema = new Schema(
{
	_id:String,
	dish_picture:{ data: Buffer, contentType: String },
	dish_price:Number,
	dish_description:String,
	dish_soldout:Boolean,
	_catalog: { type:String, ref: 'catalog'},
    catalog: String,
	_comment:[{type:Schema.Types.ObjectId, ref:'comment'}]
});

module.exports = mongoose.model('dish', DishSchema,'dish');