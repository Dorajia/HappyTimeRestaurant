var express = require('express');
var router = express.Router();

//var mongoose = require('mongoose');
var Paycard = require('../models/paycard.js');

/* GET all cards info by user_name. */
router.get('/:userName', function(req, res, next) {
	Paycard.find({user_name: req.params.userName}, function(err, data){
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

//POST
router.post('/:userName/:type/:holder/:cardNo/:expireDate/:bankName', function(req, res, next) {
  
	var newItem = new Paycard({
		user_name: req.params.userName, 
		card_type: req.params.type, 
		card_holder:req.params.holder,
		card_number: req.params.cardNo,
		expire_date: req.params.expireDate,
        bank_name: req.params.bankName
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


/* UPDATE one item */
router.put('/:userName/:cardNo/:type/:holder/:newcardNo/:expireDate/:bankName', function(req, res, next) {
	var query = {user_name: req.params.userName, card_number: req.params.cardNo};
	var update = {card_type: req.params.type, card_holder: req.params.holder, card_number: req.params.newcardNo, 
	expire_date: req.params.expireDate, bank_name: req.params.bankName};
	var options = {new: true};

	Paycard.findOneAndUpdate(query, update, options, function(err, data){
		if (err) {
			res.json(err.message);
		}
		else {
			res.json(data);
		}
	});
});


/* DELETE one item */
router.delete('/:userName/:cardNo', function(req, res, next) {
    var conditions = {user_name: req.params.userName, card_number: req.params.cardNo};
	Paycard.findOneAndRemove(conditions, function(err, data){
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