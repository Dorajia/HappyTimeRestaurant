var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
      _id:String,
      branch_status:Boolean,
      address:String,
      zip_code:{type:String, ref: 'branch'}
});

var BranchSchema = new Schema({
    _id: String,
    city_name:String,
    restaurant:[{type: String, ref: 'restaurant'}]
    });

mongoose.model('restaurant',RestaurantSchema,'restaurant');
module.exports = mongoose.model('branch', BranchSchema,'branch');