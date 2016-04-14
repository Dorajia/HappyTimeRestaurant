var express = require('express');
var router = express.Router();

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
	var newItem = new Dish({dish_name: req.body.name, dish_description: req.body.description,dish_price:req.body.price,dish_soldout:req.body.sold,dish_picture:""});
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
	Dish.find({dish_name: req.params.name}, function(err, data){
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
	var name = {dish_name: req.params.name};
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