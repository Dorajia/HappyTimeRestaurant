var express = require('express');
var router = express.Router();
//var mongoose = require('mongoose');
var Inventory = require('../models/inventory.js');

/* GET all inventory. */
router.get('/', function(req, res, next) {
  Inventory.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

//POST
router.post('/create/:branchId/:dishName/:isSoldout', function(req, res, next) {
	var newItem = new Inventory(
    {branch_id:req.params.branch_id,
	dish_inventory:[
	    {    
             dish_name:req.params.dishName,
             dish_soldout:req.params.isSoldout
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

/* GET one branch inventory details by its branch id*/
router.get('/:branchId', function(req, res, next) {
	Inventory.find({branch_id: req.params.branchId}, function(err, data){
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



/* UPDATE one dish sold status in specific branch restaurant  */
router.put('/:name', function(req, res, next) {

});


/* DELETE one branch's inventory */
router.delete('/:branchId', function(req, res, next) {
	Inventory.findOneAndRemove({chainRest_id: req.params.branchId}, function(err, data){
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