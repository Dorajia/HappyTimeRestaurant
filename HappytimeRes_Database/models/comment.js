var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema(
{
	comment_id:'',
	user_id:'',
	dish_name:String,
	user_name:String,
	publish_time:Date,
	score:Number,
	comment_description: String
});

module.exports = mongoose.model('comment', CommentSchema);