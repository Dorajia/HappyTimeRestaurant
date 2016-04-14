var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BranchSchema = new Schema({
zip_code: String,
city_name:String,
restaurant:
{
  branch_name:String,
  branch_status:Boolean,
  address:String
}
});

module.exports = mongoose.model('branch', BranchSchema);