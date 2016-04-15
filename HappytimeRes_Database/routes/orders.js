var express = require('express');
var router = express.Router();

var Order = require('../models/order.js');

/*Save one order*/

/*GET order by user_name*/

/*GET order by user_name and order_time*/

/*DELETE order by user_name and order_time*/


/* GET /Dish listing. */
router.get('/', function(req, res, next) {
  Order.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

//POST
router.post('/', function(req, res, next) {
	var newItem = new Order(
	{order_id: req.body.id,
	user_name:req.body.name,
	order_time:'Date',
	confirm_time:'Date',
	restaurant_name:req.body.restaurant,
	delivery_address:
	{
	    street:req.body.street,
	    city:req.body.city,
	    state:req.body.state,
	    zip:req.body.zip
	},
	dishes: [{
	dish_name:req.body.dish,
	dish_pic:'',
	dish_price:req.body.price,
	number:req.body.number}]
		
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
	Order.find({order_id: req.params.id}, function(err, data){
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
	var id = {order_id: req.params.id};
	var update = {dish: req.body.dish};
	var options = {new: true};

	Order.findOneAndUpdate(id, update, options, function(err, data){
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
	Order.findOneAndRemove({order_id: req.params.id}, function(err, data){
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