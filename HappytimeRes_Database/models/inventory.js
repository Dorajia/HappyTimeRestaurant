var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inventorySchema = new Schema(
{
	inventory_id: Number,
        chainRest_id: Number,
	dish_inventory: 
	[
		{dish_name:String,
		dish_soldout:Boolean}
	]
	
});

module.exports = mongoose.model('inventory', inventorySchema);