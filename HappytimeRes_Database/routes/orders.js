var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var config = require('../config/secretkey');
var gettoken = require ('../models/gettoken');
var passport = require('passport');
var moment = require('moment-timezone');
// bundle our routes

require('../config/passport')(passport);

var Order = require('../models/order');
var User = require('../models/user');
//var Comment = require('../models/comment.js');

/*GET order by user_name*/
router.get('/getorders', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = gettoken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    var query=User.find({_id: decoded._id});
//    query.sort({"order_time":-1});
    query.exec(function(err, user) {
        if (err) throw err;
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          Order.find({user:decoded._id},function(err, data){
         	if (err)
         	return res.status(403).send({success: false, msg: 'Failed to get orders'});
         	else{
        	return res.status(200).send({sucess:true, data:data});
         	}
         });
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});


/*GET order by order_id*/
router.get('/getorders/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = gettoken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.find({_id: decoded._id}, function(err, user) {
        if (err) throw err;
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          Order.find({_id:req.params.id},function(err, data){
         	if (err)
         	return res.status(403).send({success: false, msg: 'Failed to get orders'});
         	else{
        	return res.status(200).send({sucess:true, data:data});
         	}
         });
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
          	 var format = 'YYYY/MM/DD HH:mm:ss ZZ';
          	var order_id = {_id:req.params.id};
            var update = {confirm_time:moment().tz("America/Los_Angeles").format(format)};
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

/*Confirm order by order id*/
router.post('/remove/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
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
                    
            Order.remove(order_id,function(err, data){
                if (err) {
                    return res.status(403).send({success: false, msg: 'Remove comfirm order'});
                    }
                else {
                      return res.status(200).send({success: true, msg: 'Remove Order successful!',data:data});

                  }
              });
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

module.exports = router;