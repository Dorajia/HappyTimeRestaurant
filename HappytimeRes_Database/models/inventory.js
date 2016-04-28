var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inventorySchema = new Schema(
{
	_id: Number,
    branch_id: Number,
	dish_inventory: 
	[
		{dish_name:{type:String, ref:'dish'},
		dish_soldout:Boolean}
	]
	
});

module.exports = mongoose.model('inventory', inventorySchema, 'inventory');