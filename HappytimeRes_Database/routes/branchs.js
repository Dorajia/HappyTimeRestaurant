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

//POST
router.post('/', function(req, res, next) {
	var newItem = new Branch({branch_name: req.body.name, branch_status: req.body.status,zip_code:req.body.zip_code});
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
router.put('/:name', function(req, res, next) {
	var name = {branch_name: req.params.name};
	var update = {branch_status: req.body.status};
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
router.delete('/:name', function(req, res, next) {
	Branch.findOneAndRemove({branch_name: req.params.name}, function(err, data){
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