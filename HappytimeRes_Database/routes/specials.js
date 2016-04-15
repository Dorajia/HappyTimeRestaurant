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
	special_id: '',
	recommended_dish: 
	[
		{dish_name:req.body.dish_name,
		dish_picture:'',
		dish_price:req.body.dish_price,
		dish_description:req.body.description,
		catalog_name:req.body.catalog_name,
		dish_soldout:req.body.soldout}
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

/* GET one item */
router.get('/:id', function(req, res, next) {
	Special.find({special_id: req.params.id}, function(err, data){
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

/* GET one item with full dish information with special ID*/

router.get('/catalog/:name', function(req, res, next) {
	 Special.find({ _id:req.params.name })
	.populate('recommended_dish')
	.exec(function (err, data) {
	  if (err) return next(err);
      for (var k in data) 
			res.json(data[k].recommended_dish);
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
	Special.findOneAndRemove({special_id: req.params.id}, function(err, data){
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