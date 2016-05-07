var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var timestamps = require('mongoose-createdat-updatedat');
var moment = require('moment-timezone');


var CommentSchema = new Schema(
{
	_user:{type:String, ref:'user'},
	user_name:String,
	dish_name:{type:String, ref:'dish'},
	score:Number,
	comment_description: String,
	order_id: String,
	createdAt:String
});

//automaticall add createdat and updateat in the schema.
//CommentSchema.plugin(timestamps);

CommentSchema.pre('save', function (next) {
	 var format = 'YYYY/MM/DD HH:mm:ss ZZ';
    this.createdAt = moment().tz("America/Los_Angeles").format(format);
    next();
});



module.exports = mongoose.model('comment', CommentSchema,'comment');