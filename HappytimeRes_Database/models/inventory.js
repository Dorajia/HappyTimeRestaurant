var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inventorySchema = new Schema(
{
	_id: Number,
//    _branch: { type:Number, ref: 'branch'},
    branch_id: Number,
    chainRest_id: Number,
	dish_inventory: 
	[
		{dish_name:String,
		dish_soldout:Boolean}
	]
	
});

module.exports = mongoose.model('inventory', inventorySchema);