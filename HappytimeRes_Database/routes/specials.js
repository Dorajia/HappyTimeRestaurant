var express = require('express');
var router = express.Router();

var Special = require('../models/special.js');

//Get All
router.get('/', function(req, res, next) {
  Special.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

//POST
router.post('/', function(req, res, next) {
	var newItem = new Special({
	_id: req.body.special,
	recommended_dish: 
	[
		{recommended_dish:req.body.dish_name}
	]
});
	newItem.save(function(err, data){
		if (err) {
			res.json(err);
		}
		else {
			res.json(data);
		}
	});
});

/* GET all disheds use id */
router.get('/:id', function(req, res, next) {
	Special.find({_id: req.params.id}, function(err, data){
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
router.put('/:id', function(req, res, next) {
	var id = {special_id: req.params.id};
	var update = {dish_name: req.body.dish};
	var options = {new: true};

	Special.findOneAndUpdate(id, update, options, function(err, data){
		if (err) {
			res.json(err.message);
		}
		else {
			res.json(data);
		}
	});
});


/* DELETE one item */
router.delete('/:id', function(req, res, next) {
	Special.findOneAndRemove({_id: req.params.id}, function(err, data){
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