var express = require('express');
var router = express.Router();

var User = require('../models/user.js');

/*Create new user account*/
router.post('/', function(req, res, next) {
	var newItem = new User({
	_id: req.body.name,
	password:req.body.password,
	email_address:req.body.email_address,
	phone_number:{_id:req.body.phone}
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

/*update password*/
router.put('/password/:name', function(req, res, next) {
	var name = {_id: req.params.name};
	var update = {password: req.body.password};
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


/*Add an additional phone number*/
router.post('/add_phone/:name/:phone', function(req, res, next) {
	var name = {_id: req.params.name};
	var update = {$push:{phone_number:{_id:req.params.phone}}};
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

/*Remove a phone number*/
router.delete('/remove_phone/:name/:phone', function(req, res, next) {
	var name = {_id: req.params.name};
	var update = {$pull:{phone_number:{_id:req.params.phone}}};
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

/*Add one delivery_address*/
router.post('/add_address/:name', function(req, res, next) {
	var name = {_id: req.params.name};
	var update = {$push:{delivery_address:{zipcode:req.body.zipcode, state:req.body.state,address:req.body.address}}};
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


/*Update delivery_address by user_id and address*/


/*Remove one delivery_address by user_id,address*/
router.delete('/remove_address/:name', function(req, res, next) {
	var name = {_id: req.params.name};
	var update = {$pull:{delivery_address:{address:req.body.address}}};
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



/*Get all delivery_address by user id*/
router.get('/address/:name', function(req, res, next) {
	 User.find({ _id:req.params.name }, function (err, data) {
	  if (err) return next(er
	  else{
      	for (var k in data) 
			res.json(data[k].delivery_address);
		  }
		});
	});

//Get All users
router.get('/', function(req, res, next) {
  User.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});


/* GET one item */
router.get('/:name', function(req, res, next) {
	User.find({_id: req.params.name}, function(err, data){
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


/* UPDATE email_address */
router.put('/:name', function(req, res, next) {
	var name = {_id: req.params.name};
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
	User.findOneAndRemove({_id: req.params.name}, function(err, data){
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