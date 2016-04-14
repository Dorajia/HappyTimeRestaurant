var express = require('express');
var router = express.Router();

var Recommendation = require('../models/recommendation.js');

//Get All
router.get('/', function(req, res, next) {
  Recommendation.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

//POST
router.post('/', function(req, res, next) {
	var newItem = new Recommendation({
	recommend_id:'',
	catalog_name:req.body.catalog_name,
	related_dishes:[
	{
	 	dish_name:req.body.dish,
	 	recommend_dish:req.body.recommend_dish
	}]
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

/* GET one item */
router.get('/:id', function(req, res, next) {
	Recommendation.find({recommend_id: req.params.id}, function(err, data){
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
	var id = {recommend_id: req.params.id};
	var update = {recommend_dish: req.body.dish};
	var options = {new: true};

	Recommendation.findOneAndUpdate(id, update, options, function(err, data){
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
	Recommendation.findOneAndRemove({recommend_id: req.params.id}, function(err, data){
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