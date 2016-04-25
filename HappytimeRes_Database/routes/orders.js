var express = require('express');
var router = express.Router();

var Order = require('../models/order.js');

/*GET order by user_name*/

/*GET order by user_name and order_time*/

/*DELETE order by user_name and order_time*/

/*Confirm order*/


//POST

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