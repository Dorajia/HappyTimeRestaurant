var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema(
{
	_user:{type:String, ref:'user'},
	user_name:String,
	dish_name:String,
	publish_time:{type: Date, required: true, default: Date.now},
	score:Number,
	comment_description: String
});

module.exports = mongoose.model('comment', CommentSchema,'comment');