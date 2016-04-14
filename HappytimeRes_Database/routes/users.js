var express = require('express');
var router = express.Router();

var User = require('../models/user.js');

//Get All
router.get('/', function(req, res, next) {
  User.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

//POST
router.post('/', function(req, res, next) {
	var newItem = new User({
 	user_SKU:req.body.sku,
	user_name: req.body.name,
	password:req.body.password,
	email_address:req.body.email_address,
	phone_number:[req.body.phone_number],
	delivery_address:
	[
		{street:req.body.street,
		city:req.body.city,
		state:req.body.state,
		zip:req.body.zip}
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
router.get('/:name', function(req, res, next) {
	User.find({user_name: req.params.name}, function(err, data){
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
	var name = {user_name: req.params.name};
	var update = {email_address: req.body.email_address};
	var options = {new: true};

	User.findOneAndUpdate(name, update, options, function(err, data){
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
	User.findOneAndRemove({user_name: req.params.name}, function(err, data){
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