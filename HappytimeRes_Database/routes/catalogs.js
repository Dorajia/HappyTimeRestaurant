var express = require('express');
var router = express.Router();

var Catalog = require('../models/catalog.js');

/* GET all catalog. */
router.get('/', function(req, res, next) {
  Catalog.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

//POST
router.post('/', function(req, res, next) {
	var newItem = new Catalog({catalog_name: req.body.name, catalog_description: req.body.description});
	newItem.save(function(err, data){
		if (err) {
			res.json(err);
		}
		else {
			res.json(data);
		}
	});
});

/* GET one item */
router.get('/:name', function(req, res, next) {
	Catalog.find({catalog_name: req.params.name}, function(err, data){
		if (err) {
			res.json(err.message);
		}
		else if (data.length===0) {
			res.json({message: 'An item with that name does not exist in this database.'});
		}
		else {
			res.json(data);
		}
	});
});


/* UPDATE one item */
router.put('/:name', function(req, res, next) {
	var name = {catalog_name: req.params.name};
	var update = {catalog_description: req.body.description};
	var options = {new: true};

	Catalog.findOneAndUpdate(name, update, options, function(err, data){
		if (err) {
			res.json(err.message);
		}
		else {
			res.json(data);
		}
	});
});


/* DELETE one item */
router.delete('/:name', function(req, res, next) {
	Catalog.findOneAndRemove({catalog_name: req.params.name}, function(err, data){
		if (err) {
			res.json(err.message);
		}
		else if (data.length===0) {
			res.json({message: 'An item with that id does not exist in this database.'});
		}
		else {
			res.json({message: 'Success. Item deleted.'});
		}
	});
});

module.exports = router;