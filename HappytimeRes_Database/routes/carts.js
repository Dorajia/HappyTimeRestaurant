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
router.post('/additem/:name/:price/:number/:total_price', passport.authenticate('jwt', { session: false}), function(req, res) {
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
            var update = {total_price:req.params.total_price,status:'active', $push:{dish:{_id:req.params.name, dish_price:req.params.price, dish_number:req.params.number}}};
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
});

//added by xiaotong
router.post('/generateOrder', passport.authenticate('jwt', { session: false}), function(req , res){
    console.log(req.body.orderItems);
    /*req.body.orderItems = [{'image':'../images/shopping_cart_pink.png',
        'name':'Yu Xiang Rou Si',
            'description':'This is a traditional sichuan food',
            'price':10.00,
            'amount':1,
            'total':10.00,},
    {'image':'../images/shopping_cart_pink.png',
        'name':'Wudong Noodle',
        'description':'This is a traditional noodle',
        'price':13.00,
        'amount':1,
        'total':13.00,},
    {'image':'../images/shopping_cart_pink.png',
        'name':'Kungpo Chicken',
        'description':'This is a delicious sichuan food',
        'price':15.00,
        'amount':3,
        'total':45.00}]
    */
    console.log(req.body.address);
    /*
    * req.body.address = {
     "address": "Howold street",
     "state": "CA",
     "zipcode": 44444,
     "_id": "5719a7164cf09c803238781a"
     }
     * */
    console.log(req.body.card);
    /*
    * req.body.card = {
    * 'cardType': 'Credit',
    * 'cardHolder': 'Judy',
    * 'ExpireDate': 'mm/yy',
    * 'bankName': 'Discover'
    * }
    * */
});

module.exports = router;