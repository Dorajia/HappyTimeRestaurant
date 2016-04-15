var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CatalogSchema = new Schema({
  _id: String,
  catalog_description: String,
  _dish:[{type:String, ref:'dish'}]
});

module.exports = mongoose.model('catalog', CatalogSchema,'catalog');