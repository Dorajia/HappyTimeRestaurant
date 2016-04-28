var express = require('express');
var router = express.Router();

var Special = require('../models/special.js');

//Get All
router.get('/', function(req, res, next) {
  Special.find()
  	.populate('special_dish') // <--
	.exec(function (err, data) {
			if (err) return next(err);
			var special_arr = [];
		  	for (var k in data){
                special_arr.push(data[k]);
		  	}    
		  	res.json(special_arr);
	});
});

//POST
router.post('/:id/:dishName', function(req, res, next) {
	var newItem = new Special({
		_id: req.params.id,
		special_dish: req.params.dishName
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


/* DELETE one item */
router.delete('/:dishName', function(req, res, next) {
	Special.findOneAndRemove({special_dish: req.params.dishName}, function(err, data){
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