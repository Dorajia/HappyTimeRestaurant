var express = require('express');
var router = express.Router();

//var mongoose = require('mongoose');
var Branch = require('../models/branch.js');

/* GET all branchs. */
router.get('/', function(req, res, next) {
  Branch.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET one branch details by its branch id*/
router.get('/:branchId', function(req, res, next) {
	Branch.find({_id: req.params.branchId}, function(err, data){
		if (err) {
			res.json(err.message);
		}
		else if (data.length===0) {
			res.json({message: 'An item with that branch id does not exist in this database.'});
		}
		else {
			res.json(data);
		}
	});
});
	
//POST
router.post('/create/:branchId/:name/:street/:city/:state/:zip/:phone', function(req, res, next) {
	var newItem = new Branch({
		_id: req.params.branchId, 
		branch_name: req.params.name, 
		branch_address:
			{street: req.params.street,
			city: req.params.city,
			state: req.params.state,
			zip: req.params.zip},
        branch_phone: req.params.phone
		
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

/*router.post('/', function(req, res, next) {
	var newItem = new Branch({
		_id: req.body.branchId, 
		branch_name: req.body.name, 
		branch_address:
		[			
			{street: req.body.street,
			city: req.body.city,
			state: req.body.state,
			zip: req.body.zip}
		],
        branch_phone: req.body.phone
		
	});
	newItem.save(function(err, data){
		if (err) {
			res.json(err);
		}
		else {
			res.json(data);
		}
	});
}); */

/* GET one item */
router.get('/:name', function(req, res, next) {
	Branch.find({branch_name: req.params.name}, function(err, data){
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
router.put('/:name/:phone', function(req, res, next) {
	var name = {branch_name: req.params.name};
	var update = {branch_phone: req.params.phone};
	var options = {new: true};

	Branch.findOneAndUpdate(name, update, options, function(err, data){
		if (err) {
			res.json(err.message);
		}
		else {
			res.json(data);
		}
	});
});


/* DELETE one item */
router.delete('/:branchId', function(req, res, next) {
	Branch.findOneAndRemove({_id: req.params.branchId}, function(err, data){
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