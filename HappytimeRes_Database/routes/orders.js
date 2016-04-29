var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var config = require('../config/secretkey');
var gettoken = require ('../models/gettoken');
var passport = require('passport');
// bundle our routes

require('../config/passport')(passport);

var Order = require('../models/order');
var User = require('../models/user');

/*GET order by user_name*/
router.get('/getorders', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = gettoken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.find({_id: decoded._id}, function(err, user) {
        if (err) throw err;
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          Order.find({user:decoded._id},function(err, data){
         	if (err)
         	return res.status(403).send({success: false, msg: 'Failed to get orders'});
         	else{
         	  console.log();
        	return res.status(200).send({sucess:true, data:data});
         	}
         })
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

/*Confirm order by order id*/
router.post('/confirm/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = gettoken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      _id: decoded._id
    }, function(err, user) {
        if (err)
        return res.status(500).send({success: false, msg: err});
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          	var order_id = {_id:req.params.id};
            var update = {confirm_time:Date.now()};
            var options = {new: true};
                    
            Order.findOneAndUpdate(order_id, update, options, function(err, data){
                if (err) {
                    return res.status(403).send({success: false, msg: 'Failed comfirm order'});
                    }
                else {
                    return res.status(200).send({success: true, msg: 'Confirm Order successful!',data:data});
                    }
                });
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});



module.exports = router;