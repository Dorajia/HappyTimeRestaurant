var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var config = require('../config/secretkey');
var gettoken = require ('../models/gettoken');

var passport = require('passport');
// bundle our routes

require('../config/passport')(passport);
var Cart = require('../models/cart.js');
//check dish sold out.
var Dish = require ('../models/dish.js');

//get items in shopping cart
router.get('/getitems', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = gettoken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    Cart.findOne({_id: decoded._id}, function(err, cart) {
        if (err) throw err;
        if (!cart) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          return res.status(200).send({sucess:true, data:cart});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});


//add item in shopping cart, if the frontend can send the information, it is great, otherwise, need to find the price from dish first.
router.put('/additem/:name/:price/:number', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = gettoken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    Cart.findOne({
      _id: decoded._id
    }, function(err, cart) {
        if (err)
        return res.status(500).send({success: false, msg: err});
        if (!cart) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            var newprice = cart.total_price + req.params.price;
          	var cart_id = {_id:decoded._id};
            var update = {total_price:newprice,status:'active', $push:{dish:{dish_name:req.params.name, dish_price:req.params.price, dish_number:req.params.number}}};
            var options = {new: true};
                    
            Cart.findOneAndUpdate(cart_id, update, options, function(err, data){
                if (err) {
                    return res.status(403).send({success: false, msg: 'Failed add item'});
                    }
                else {
                    return res.status(200).send({success: true, msg: 'Update successful'});
                    }
                });
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});


//remove the whole item in shopping cart
router.put('/removeitem/:name/:price', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = gettoken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    Cart.findOne({
      _id: decoded._id
    }, function(err, cart) {
        if (err)
        return res.status(500).send({success: false, msg: "Failed to get shopping cart"});
        if (!cart) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          	var cart_id = {_id:decoded._id};
          	var newprice = cart.total_price - req.params.price;
            var update = {total_price:newprice, $pull:{dish:{dish_name:req.params.name}}};
            var options = {new: true};
                    
            Cart.findOneAndUpdate(cart_id, update, options, function(err, data){
                if (err) {
                    return res.status(403).send({success: false, msg: 'Failed remove item from shopping cart'});
                    }
                else {
                    return res.status(200).send({success: true, msg: 'Remove items from shopping cart successful'});
                    }
                });
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

//change the number of items in shopping cart
router.put('/changenumber/:name/:price/number:', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = gettoken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    Cart.findOne({
      _id: decoded._id
    }, function(err, cart) {
        if (err)
        return res.status(500).send({success: false, msg: "Failed to get shopping cart"});
        if (!cart) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          	var cart_id = {_id:decoded._id};
          	var newprice = cart.total_price - req.params.price;
            var update = {total_price:newprice,status:'active', $pull:{dish:{dish_name:req.params.name}}};
            var options = {new: true};
                    
            Cart.findOneAndUpdate(cart_id, update, options, function(err, data){
                if (err) {
                    return res.status(403).send({success: false, msg: 'Failed remove item from shopping cart'});
                    }
                else {
                    return res.status(200).send({success: true, msg: 'Remove items from shopping cart successful'});
                    }
                });
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

//Place order.
router.get('/placeorder/:restaurant/:street/:city/:state/:zip/:phone', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = gettoken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    Cart.findOne({
      _id: decoded._id
    }, function(err, cart) {
        if (err)
        return res.status(500).send({success: false, msg: "Failed to get shopping cart"});
        if (!cart) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          cart.placeOrder(req.params.restaurant,req.params.street,req.params.city,req.params.state,req.params.zip,req.params.phone,function(err,data)
          {
              if(err) 
                 return res.json(err);
          	  else{
          	     return res.status(200).send({success: true, data:data});
          	  }
          });
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});


router.get('/', function(req, res,next) {
  Cart.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});
 
module.exports = router;