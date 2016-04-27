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
router.post('/:dish/:recommendDish', function(req, res, next) {
	var newItem = new Recommendation({
		dish_name:req.params.dish,
	 	recommend_dish:req.params.recommendDish
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
/*router.get('/:dishName', function(req, res, next) {
	Recommendation.find({dish_name: req.params.dishName}, function(err, data){
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
});*/


/* UPDATE one item */
router.put('/:dish/:recommendDish', function(req, res, next) {
	var dish = {dish_name: req.params.dish};
	var update = {recommend_dish: req.params.recommendDish};
	var options = {new: true};

	Recommendation.findOneAndUpdate(dish, update, options, function(err, data){
		if (err) {
			res.json(err.message);
		}
		else {
			res.json(data);
		}
	});
});


/* DELETE one item */
router.delete('/:dish', function(req, res, next) {
	Recommendation.findOneAndRemove({dish_name: req.params.dish}, function(err, data){
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

/* GET recommendation list according to the order */
router.get('/:order', function(req, res, next) {
	var list = req.params.order.toString().split(",");
	console.log("list is:" + list);
	var recommend_arr = [];
	var count = list.length;
	for (var k in list){
		console.log("dish is:" + list[k]);
		Recommendation.find({dish_name:list[k]})
		.populate('recommend_dish') // <--
		.exec(function (err, data) {
			if(err) return next(err);
			recommend_arr.push(data[0].recommend_dish);
			count--;
			if(count == 0) res.json(recommend_arr);
		});
	} 
});

module.exports = router;