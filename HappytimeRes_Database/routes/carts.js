var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var config = require('../config/secretkey');
var gettoken = require ('../models/gettoken');
var shortid = require('shortid');
var passport = require('passport');
require('../config/passport')(passport);
var Cart = require('../models/cart.js');
var Order = require('../models/order');

//get items in shopping cart
router.get('/getitems', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = gettoken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    Cart.findOne({_id: decoded._id})
    .select('dish')
    .exec(function(err, cart) {
        if (err) throw err;
        if (!cart) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          return res.status(200).json(cart);
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});


//add item in shopping cart
router.post('/additem', passport.authenticate('jwt', { session: false}), function(req, res) {
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
          	var cart_id = {_id:decoded._id};
            var update = {total_price:req.body.total_price,status:'active', $push:{dish:{_id:req.body.name, description:req.body.description, dish_price:req.body.price, dish_number:req.body.amount,checked:req.body.checked,total:req.body.total}}};
            var options = {new: true};
                    
            Cart.findOneAndUpdate(cart_id, update, options, function(err, data){
                if (err) {
                    return res.status(403).send({success: false, msg: 'Failed add item'});
                    }
                else {
                    return res.status(200).send({success: true, msg: 'Add item in shopping cart successful',data:data});
                    }
                });
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});


//remove the whole item in shopping cart
router.post('/removeitem/:name/:newtotal_price', passport.authenticate('jwt', { session: false}), function(req, res) {
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
            var update = {total_price:req.params.newtotal_price, $pull:{dish:{_id:req.params.name}}};
            var options = {new: true};
                    
            Cart.findOneAndUpdate(cart_id, update, options, function(err, data){
                if (err) {
                    return res.status(403).send({success: false, msg: 'Failed remove item from shopping cart'});
                    }
                else {
                    return res.status(200).send({success: true, msg: 'Remove items from shopping cart successful',data:data});
                    }
                });
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

//change the number of one item in shopping cart
router.post('/changenumber/:name/:newprice/:newnumber/:newtotal_price', passport.authenticate('jwt', { session: false}), function(req, res) {
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
          //$set: {'dish.$.dish_number':2
          	var cart_id = {_id:decoded._id,"dish._id":req.params.name};
            var update = {total_price:req.params.newtotal_price,status:'active', $set:{'dish.$.dish_number':req.params.newnumber,'dish.$.dish_price':req.params.newprice}};
            var options = {new: true};
                    
            Cart.findOneAndUpdate(cart_id, update, options, function(err, data){
                if (err) {
                    return res.status(403).send({success: false, msg: 'Failed add the number of item in shopping cart'});
                    }
                else {
                    return res.status(200).send({success: true, msg: 'Add the number of item in shopping cart successful',data:data});
                    }
                });
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

//Place order.
/*router.get('/placeorder/:restaurant/:street/:city/:state/:zip/:phone', passport.authenticate('jwt', { session: false}), function(req, res) {
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
          cart.placeOrder(req.params.restaurant,req.params.street,req.params.city,req.params.state,req.params.zip,req.params.phone,function(err,order)
          {
              if(err) 
                 return res.json(err);
          	  else{
                  	var cart_id = {_id:decoded._id};
                    var update = {total_price:0,status:'Empty', dish:[]};
                    var options = {new: true};
                  	Cart.findOneAndUpdate(cart_id, update, options,function(err, cart){
                  		if (err) {
                      return res.status(500).send({success: false, msg: "Failed to remove items from shopping cart"});
                  		}
                  		else if (cart.length===0) {
                      return res.status(500).send({success: false, msg: "Can't find shopping cart"});
                  		}
                  		else {
                      return res.status(200).send({success: true, msg: "place order successful", data:order});
                  		}
                  	});
          	  }
          });
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});*/

router.post('/placeorder', passport.authenticate('jwt', { session: false}), function(req, res) {
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
            var newOrder = new Order({
            _id: shortid.generate(),
            user:decoded._id,
            restaurant_name:req.body.restaurant,
            delivery_address:req.body.address,
            dishes:req.body.orderItems,
            card:req.body.card,
            total_price:req.body.totalprice
            });
            newOrder.save(function(err,order) {
              if(err) 
                    return res.status(500).send({success: false, msg: "Failed to place order"});
          	  else{
                   var cart_id = {_id:decoded._id};
                   var cb =	function (err, data) {
                    	 if (err) {
                        return res.status(500).send({success: false, msg: "Failed to remove items from shopping cart"});
                    		}
                    		else if (data.length===0) {
                        return res.status(500).send({success: false, msg: "Can't find shopping cart"});
                    		}
                    		else {
                        return;
                    		}
                    };
                    var deleteitems=function (callback) {
                  	  for(var i = 0; i < req.body.orderItems.length; i++){
                        var update = {total_price:cart.total_price-req.body.totalprice,$pull:{dish:{_id:req.body.orderItems[i]._id}}};
                        var options = {new: true};
                      	Cart.findOneAndUpdate(cart_id, update, options,cb);
                  	  }
                  	  callback();
                    };
                  var returnResult =function() {
                      return res.status(200).send({success: true, msg: "place order successful", data:order});
                  };
                   deleteitems(returnResult);
          	  }
        });
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

module.exports = router;