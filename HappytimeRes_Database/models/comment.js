var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-createdat-updatedat');

var CommentSchema = new Schema(
{
	_user:{type:String, ref:'user'},
	user_name:String,
	dish_name:{type:String, ref:'dish'},
	score:Number,
	comment_description: String,
	order_id: String
});

//automaticall add createdat and updateat in the schema.
CommentSchema.plugin(timestamps);

module.exports = mongoose.model('comment', CommentSchema,'comment');