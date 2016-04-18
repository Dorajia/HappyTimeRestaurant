var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-createdat-updatedat');

var CommentSchema = new Schema(
{
	_user:{type:String, ref:'user'},
	user_name:String,
	dish_name:{type:String, ref:'dish'},
//	publish_time:{type: Date, required: true, default: Date.now},
	score:Number,
	comment_description: String
});

//automaticall add createdat and updateat in the schema.
CommentSchema.plugin(timestamps);

module.exports = mongoose.model('comment', CommentSchema,'comment');