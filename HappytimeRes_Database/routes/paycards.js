var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var config = require('../config/secretkey');
var gettoken = require ('../models/gettoken');
var passport = require('passport');
// bundle our routes

require('../config/passport')(passport);
//var mongoose = require('mongoose');
var Paycard = require('../models/paycard.js');
var User = require('../models/user');

/* GET all cards info by user_name. */
router.get('/', passport.authenticate('jwt', { session: false}), function(req, res, next) {
	var token = gettoken(req.headers);
  	if (token) {
    	var decoded = jwt.decode(token, config.secret);
    	User.find({_id: decoded._id}, function(err, user) {
	        if (err) throw err;
	        if (!user) {
	          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
	        } else {
				Paycard.find({user_name: decoded._id}, function(err, data){
					if (err) {
						res.json(err.message);
					}
/*					else if (data.length===0) {
						res.json({message: 'An item with that name does not exist in this database.'});
					} */
					else {
						res.json(data);
					}
				});
	        }
    	});
  	}
  	else {
	    return res.status(403).send({success: false, msg: 'No token provided.'});
	}
});

//POST
router.post('/:type/:holder/:cardNo/:expireDate/:bankName', passport.authenticate('jwt', { session: false}), function(req, res, next) {
    var token = gettoken(req.headers);
  	if (token) {
    	var decoded = jwt.decode(token, config.secret);
    	User.find({_id: decoded._id}, function(err, user) {
	        if (err) throw err;
	        if (!user) {
	          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
	        } else {
				var newItem = new Paycard({
					user_name: decoded._id, 
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
	        }
    	});
  	}
});


/* UPDATE one item */
router.put('/:cardNo/:type/:holder/:newcardNo/:expireDate/:bankName', passport.authenticate('jwt', { session: false}), function(req, res, next) {
	var token = gettoken(req.headers);
  	if (token) {
    	var decoded = jwt.decode(token, config.secret);
    	User.find({_id: decoded._id}, function(err, user) {
	        if (err) throw err;
	        if (!user) {
	          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
	        } else {
				var query = {user_name: decoded._id, card_number: req.params.cardNo};
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
	        }
    	});
  	}
});


/* DELETE one item */
router.delete('/:cardNo', passport.authenticate('jwt', { session: false}), function(req, res, next) {
	var token = gettoken(req.headers);
  	if (token) {
    	var decoded = jwt.decode(token, config.secret);
    	User.find({_id: decoded._id}, function(err, user) {
	        if (err) throw err;
	        if (!user) {
	          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
	        } else {
			    var conditions = {user_name: decoded._id, card_number: req.params.cardNo};
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
	        }
    	});
  	}
});

module.exports = router;