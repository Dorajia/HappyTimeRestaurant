var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecommendationSchema = new Schema({
//		_id:String,
		dish_name:{type:String, ref:'dish'},
		recommend_dish:{type:String, ref:'dish'}
});

module.exports = mongoose.model('recommendation', RecommendationSchema, 'recommendation');