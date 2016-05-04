var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var config = require('../config/secretkey');
var gettoken = require ('../models/gettoken');

var passport = require('passport');

require('../config/passport')(passport);
var User = require('../models/user.js');
var Delivery = require('../models/delivery.js');

//add one delivery address
router.post('/addaddress', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = gettoken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({_id: decoded._id},function(err, user) {
        if (err)
          return res.send({success: false, msg: err});
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            var newDelivery = new Delivery({
              _user: decoded._id,
              address1:req.body.address1, 
              address2:req.body.address2, 
              city:req.body.city, 
              zipcode:req.body.zipcode, 
              state:req.body.state,
              receiver:req.body.receiver,
              phone:req.body.phone,
              isdefault:req.body.isdefault
            });
            newDelivery.save(function(err,data) {
              if (err) {
              return res.status(403).send({success:false, msg:'Add address failed'});
              }
              else{
                  var name = {_id: decoded._id};
                	var update = {$push:{_delivery_address:data}};
                	var options = {new: true};
                
                	User.findOneAndUpdate(name, update, options, function(err, data){
                		if (err) {
                      return res.status(403).send({success: false, msg: "Failed to add address"});
                		}
                		else {
                		  Delivery.find({_user:decoded._id},function(err,alldelivery){
                        if (err){
                          return res.status(403).send({success: false, msg: "Add address failed"});
                        }
                        else{
                        	return res.status(200).send({sucess:true, delivery_address:alldelivery});
                        }
                     });
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

//Get all delivery address of user
router.get('/getaddress', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = gettoken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({_id: decoded._id},function(err, user) {
        if (err)
          return res.send({success: false, msg: "failed to get address"});
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
              Delivery.find({_user:decoded._id},function(err,alldelivery){
                  if (err){
                    return res.status(403).send({success: false, msg: "Failed to get address"});
                  }
                  else{
                  	return res.status(200).send({sucess:true, delivery_address:alldelivery});
                  }
               });          
          }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

//Remove one delivery address
router.post('/removeaddress/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = gettoken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({_id: decoded._id},function(err, user) {
        if (err)
          return res.send({success: false, msg: err});
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          Delivery.remove({_user:decoded._id,_id:req.params.id}, function(err,data){
              if (err) {
              return res.status(403).send({success:false, msg:'Remove address failed'});
              }
              else{
              Delivery.find({_user:decoded._id},function(err,alldelivery){
                  if (err){
                    return res.status(403).send({success: false, msg: "Remove address failed"});
                  }
                  else{
                  	return res.status(200).send({sucess:true, delivery_address:alldelivery});
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
 
 
//edit one delivery address
router.post('/editaddress/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = gettoken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({_id: decoded._id},function(err, user) {
        if (err)
          return res.send({success: false, msg: err});
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          	var name = {_user:decoded._id,_id:req.params.id};
          	var update = {address1:req.body.address1,address2:req.body.address2, city:req.body.city,zipcode:req.body.zipcode, state:req.body.state,receiver:req.body.receiver,phone:req.body.phone,isdefault:req.body.isdefault};
          	var options = {new: true};
          
          	Delivery.findOneAndUpdate(name, update, options, function(err, data){
          		if (err) {
                return res.status(403).send({success: false, msg: 'Failed to edit address'});
          		}
              else if (data==null) {
                return res.status(403).send({success: false, msg:'Failed to edit address.'});
              }            		
          		else {
                return res.status(200).send({sucess:true, delivery_address:data});
          		}
          	});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

/*Set default address*/
router.post('/setdefault/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = gettoken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({_id: decoded._id},function(err, user) {
        if (err)
          return res.send({success: false, msg: err});
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
              Delivery.find({_user:decoded._id,isdefault:true},function(err,defaultdelivery){
                  if (err){
                    return res.status(403).send({success: false, msg: "Failed to get address"});
                  }
                  else if (defaultdelivery.length === 0){
                    var name = {_user:decoded._id,_id:req.params.id};
                    var update = {isdefault:true};
                    var options = {new:true};
                    
                  Delivery.findOneAndUpdate(name, update, options, function(err, data){
                  		if (err) {
                        return res.status(403).send({success: false, msg: 'Failed to set default address'});
                  		}
                      else if (data == null) {
                        return res.status(403).send({success: false, msg:'Failed to set default address'});
                      }            		
                  		else {
                        return res.status(200).send({sucess:true, delivery_address:data});
                  		}
                  	});
                  }
                 else{
                        Delivery.findOneAndUpdate({_id:defaultdelivery[0]._id},{isdefault:false},{new:true}, function(err, data) {
                          if (err){
                            return res.status(403).send({success: false, msg: 'Failed to set default address'});                        
                          }
                          else if (data == null) {
                            return res.status(403).send({success: false, msg:'Failed to set default address.'});
                          }   
                          else{
                            var name2 = {_user:decoded._id,_id:req.params.id};
                            var update2 = {isdefault:true};
                            var options2 = {new:true};
                            Delivery.findOneAndUpdate(name2, update2, options2, function(err, data2){
                          		if (err) {
                                return res.status(403).send({success: false, msg:'Failed to set default address'});
                          		}
                              else if (data2 == null) {
                                return res.status(403).send({success: false, msg:'Failed to set default address'});
                              }            		
                          		else {
                                return res.status(200).send({sucess:true, delivery_address:data2});
                          		}
                          	});
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

/*Get default address*/
router.get('/getdefault', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = gettoken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({_id: decoded._id},function(err, user) {
        if (err)
          return res.send({success: false, msg: err});
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          	Delivery.find({_user:decoded._id,isdefault:1},function(err, data){
          		if (err) {
                return res.status(403).send({success: false, msg: 'Failed to get default address'});
          		}
              else if (data.length===0) {
                return res.status(403).send({success: true, msg: 'No default address'});
              }            		
          		else {
                return res.status(200).send({sucess: true, delivery_address:data});
          		}
            });
          }
        });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

module.exports = router;