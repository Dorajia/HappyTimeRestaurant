var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecommendationSchema = new Schema({
		recommend_id:Schema.ObjectId,
		catalog_name:String,
		related_dishes:[
		{
		 	dish_name:String,
		 	recommend_dish:String
		}]
});

module.exports = mongoose.model('recommendation', RecommendationSchema);