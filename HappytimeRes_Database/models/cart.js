var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
    user_id:{type:Schema.Types.ObjectId, ref:'user'},
    dishes: [
    	{dish_name: String,
    	dish_price:Number,
    	dish_number:Number
    	}],
    status: Boolean
    });

module.exports = mongoose.model('cart', CartSchema,'cart');