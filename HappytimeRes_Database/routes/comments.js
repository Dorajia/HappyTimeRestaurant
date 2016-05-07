var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var config = require('../config/secretkey');
var gettoken = require ('../models/gettoken');
var passport = require('passport');
// bundle our routes

require('../config/passport')(passport);

var User = require('../models/user');
var Comment = require('../models/comment.js');

/*Add one comment*/
router.post('/addcomments/:order_id/:dish/:score/:description', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = gettoken(req.headers);
	  if (token) {
	    var decoded = jwt.decode(token, config.secret);
	    User.find({_id: decoded._id}, function(err, user) {
	        if (err) throw err;
	        if (!user) {
	          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
	        } else {
				var newItem = new Comment(
				{user_name: decoded._id, 
				order_id:req.params.order_id,
				dish_name:req.params.dish,
				score:req.params.score,
				comment_description:req.params.description
				});
				newItem.save(function(err, data){
					if (err) {
			         return res.status(403).send({success: false, msg: 'Failed to add comment'});
					}
					else {
	        		 return res.status(200).send({sucess:true, msg:'Add comment successful',data:data});
					}
				});
		    }
		});
	}
});

/* GET comment by user_id, sort by time*/
router.get('/findbyuser/:user', function(req, res, next) {
	var query = Comment.find({user_name: req.params.user});
	query.sort('createdAt');
	query.populate('dish_name');
 	query.exec(function(err, data){
		if (err) {
		    return res.status(403).send({success: false, msg: 'Failed to get comment'});
		}
		else if (data.length===0) {
			return res.status(403).send({success: false, msg:'An item with that name does not exist in this database.'});
		}
		else {
	        return res.status(200).send({sucess:true, msg:'Get comment successful',data:data});
		}
	});
});

/*GET one comment by user and time period, sort by time */
router.get('/findbydate/:user/:topdate/:buttomdate', function(req, res, next) {
	var user = req.params.user;
	var topdate = req.params.topdate; 
	var buttomdate= req.params.buttomdate;
	var query = Comment.find(
		{user_name: user,
		 createdAt: {'$gte': new Date(buttomdate),'$lte':new Date(topdate)},
		}
		);
//db.comment.find({'createdAt' : {'$gte': ISODate('2016-04-15T18:39:00.000Z')}}) in MongoDB
	query.sort('createdAt');
	query.populate('dish_name');
 	query.exec(function(err, data){
		if (err) {
		    return res.status(403).send({success: false, msg: 'Failed to get comment'});
		}
		else if (data.length===0) {
			return res.status(403).send({success: false, msg:'An item with that name does not exist in this database.'});
		}
		else {
	        return res.status(200).send({sucess:true, msg:'Get comment successful',data:data});
		}
	});
});

/*GET comment by user and dish*/
router.get('/findbyuseranddish/:user/:dish', function(req, res, next) {
	Comment.find({user_name: req.params.user,dish_name:req.params.dish}, function(err, data){
		if (err) {
		    return res.status(403).send({success: false, msg: 'Failed to get comment'});
		}
		else if (data.length===0) {
			return res.status(403).send({success: false, msg:'An item with that name does not exist in this database.'});
		}
		else {
	        return res.status(200).send({sucess:true, msg:'Get comment successful',data:data});
		}
	});
});

/*GET comment by order_id*/
router.get('/findbyorder/:order_id', function(req, res, next) {
	var query = Comment.find({order_id:req.params.order_id});
	query.sort('createdAt');
 	query.exec(function(err, data){
		if (err) {
		    return res.status(403).send({success: false, msg: 'Failed to get comment'});
		}
		else if (data.length===0) {
			return res.status(403).send({success: false, msg:'An item with that name does not exist in this database.'});
		}
		else {
	        return res.status(200).send({sucess:true, msg:'Get comment successful',data:data});
		}
	});
});

/*GET comment by dish, sort by time, return dish_name and score only*/
router.get('/:dish', function(req, res, next) {
	var query = Comment.find({dish_name:req.params.dish});
	query.sort('createdAt');
	query.select('dish_name score');
 	query.exec(function(err, data){
		if (err) {
		    return res.status(403).send({success: false, msg: 'Failed to get comment'});
		}
		else if (data.length===0) {
			return res.status(403).send({success: false, msg:'An item with that name does not exist in this database.'});
		}
		else {
	        return res.status(200).send({sucess:true, msg:'Get comment successful',data:data});
		}
	});
});


/*GET comment by dish, sort by time, return detailed comment*/
router.get('/findbydish/:dish', function(req, res, next) {
	var query = Comment.find({dish_name:req.params.dish});
	query.sort('createdAt');
 	query.exec(function(err, data){
		if (err) {
		    return res.status(403).send({success: false, msg: 'Failed to get comment'});
		}
		else if (data.length===0) {
			return res.status(403).send({success: false, msg:'An item with that name does not exist in this database.'});
		}
		else {
	        return res.status(200).send({sucess:true, msg:'Get comment successful',data:data});
		}
	});
});


module.exports = router;