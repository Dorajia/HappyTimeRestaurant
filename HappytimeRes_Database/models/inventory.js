var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inventorySchema = new Schema(
{
	_id: Number,
<<<<<<< HEAD
//    _branch: { type:Number, ref: 'branch'},
    branch_id: Number,
=======
    chainRest_id: Number,
>>>>>>> b241e77ff90764af9ac2013d353fe2052a1680cf
	dish_inventory: 
	[
		{dish_name:String,
		dish_soldout:Boolean}
	]
	
});

module.exports = mongoose.model('inventory', inventorySchema);