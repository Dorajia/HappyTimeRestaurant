var mongoose = require('mongoose');
var dishs = require('../models/dish');
var Schema = mongoose.Schema;

var CatalogSchema = new Schema({
  catalog_name: String,
  catalog_description: String,
  dish:[{ type: Schema.ObjectId, ref: dishs }]
});

module.exports = mongoose.model('catalog', CatalogSchema);