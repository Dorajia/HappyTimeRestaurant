var express = require('express');
var router = express.Router();
require('../models/catalog.js');
//var mongoose = require('mongoose');
var Dish = require('../models/dish.js');

/* GET all dish. */
router.get('/', function(req, res, next) {
  Dish.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

//POST
router.post('/', function(req, res, next) {
	var newItem = new Dish({_id: req.body.name, 
	dish_description: req.body.description,
	dish_price:req.body.price,
	dish_soldout:req.body.sold,
	dish_picture:""});
	newItem.save(function(err, data){
		if (err) {
			res.json(err);
		}
		else {
			res.json(data);
		}
	});
});

/* GET one dish details by it's name*/
router.get('/findbyname/:name', function(req, res, next) {
	Dish.find({_id: req.params.name}, function(err, data){
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


/* GET all dishes by catalog name*/
router.get('/findbycatalog/:name', function(req, res, next) {
	Dish.find({_catalog: req.params.name}, function(err, data){
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


/*router.get('/catalog/:name', function(req, res, next) {
	 Dish.find({ _id:req.params.name })
	.populate('_catalog')
	.exec(function (err, data) {
	  if (err) return next(err);
      for (var k in data) 
			res.json(data[k]);
		});
	});*/



/* UPDATE one item */
router.put('/:name', function(req, res, next) {
	var name = {_id: req.params.name};
	var update = {dish_description: req.body.description};
	var options = {new: true};

	Dish.findOneAndUpdate(name, update, options, function(err, data){
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
	Dish.findOneAndRemove({dish_name: req.params.name}, function(err, data){
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