var express = require('express');
var router = express.Router();

var Comment = require('../models/comment.js');

/* GET comments listing. */
router.get('/', function(req, res, next) {
  Comment.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/*Add one comment*/
router.post('/', function(req, res, next) {
	var newItem = new Comment(
	{user_name: req.body.user, 
	dish_name:req.body.dish,
	publish_time:req.body.time,
	score:req.body.score,
	comment_description:req.body.description
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

/* GET one comment by user_id*/
router.get('/user', function(req, res, next) {
	Comment.find({user_name: req.params.user}, function(err, data){
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

/*GET one comment by user and time */

/*GET one comment by user and dish*/

/*GET one comment by dish*/
router.get('/dish', function(req, res, next) {
	Comment.find({dish_name: req.params.dish}, function(err, data){
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
	var update = {comment_description: req.body.description};
	var options = {new: true};

	Comment.findOneAndUpdate(id, update, options, function(err, data){
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
	Comment.findOneAndRemove({comment_id: req.params.id}, function(err, data){
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