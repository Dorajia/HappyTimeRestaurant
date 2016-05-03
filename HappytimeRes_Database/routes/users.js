var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var config = require('../config/secretkey');
var gettoken = require ('../models/gettoken');

var passport = require('passport');

require('../config/passport')(passport);
var User = require('../models/user.js');

router.post('/signup/:name/:password/:email/:phone', function(req, res, next) {
  if (!req.params.name || !req.params.password || !req.params.email || !req.params.phone) {
    res.json({success: false, msg: 'Please pass name and password.'});
  }
  else {
    var newUser = new User({
      _id: req.params.name,
      password: req.params.password,
      email:req.params.email,
      phone:{_id:req.params.phone}
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
      return res.json({success:false, msg:'User name already exist!'});
//      res.status(400);
      }
      return res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

router.post('/login/:name/:password', function(req, res) {
  User.findOne({
    _id: req.params.name
  }, function(err, user) {
    if (err)
    {
      return res.send({success: false, msg: err});
    }
    if (!user) {
      return res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.params.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
          
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

//authenticate user with token 
router.post('/updatepassword/:oldpassword/:newpassword', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = gettoken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      _id: decoded._id
    }, function(err, user) {
        if (err) 
              return res.send({success: false, msg: err});
 
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
        user.comparePassword(req.params.oldpassword, function (err, isMatch) {
        if (isMatch && !err) {
          	var name = {_id:decoded._id};
          	
          	user.encrptPassword(req.params.newpassword, function(err, hash){
          	  if(err) return res.json(err);
          	  else{
                    	var update = {password: hash};
                    	var options = {new: true};
                    
                    	User.findOneAndUpdate(name, update, options, function(err, data){
                    		if (err) {
                    			return res.status(403).send({success: false, msg: 'Failed'});
                    		}
                    		else if (data.length===0) {
                  			return res.status(403).send({success: false, msg:'Update failed.'});
                    		}
                    		else {
                    			return res.status(200).send({success: true, msg: 'Update successful'});
                    		}
                    	});
          	  }
          	});          
        }  else {
          return res.status(403).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

//get user profile
router.get('/userprofile', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = gettoken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({_id: decoded._id})
    .select('_id email _delivery_address phone')
    .populate('_delivery_address')
    .exec (function(err, user) {
        if (err) 
          return res.send({success: false, msg: err});
 
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          return res.status(200).send({sucess:true, data:user});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

//add a phone number
router.post('/addphone/:phone', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = gettoken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({_id: decoded._id},function(err, user) {
        if (err)
          return res.send({success: false, msg: err});
 
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          	var name = {_id: decoded._id};
          	var update = {$push:{phone:{_id:req.params.phone}}};
          	var options = {new: true};
          
          	User.findOneAndUpdate(name, update, options, function(err, data){
          		if (err) {
                return res.status(403).send({success: false, msg: 'Failed to add new phone'});
          		}
          		else if (data.length===0) {
          		  return res.status(403).send({success: false, msg:'Update failed.'});
              }          		
          		else {
            		return res.status(200).send({sucess:true, phone:data.phone});
          		}
          	});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

//Remove a phone number
router.post('/removephone/:phone', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = gettoken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({_id: decoded._id},function(err, user) {
        if (err) 
          return res.send({success: false, msg: err});
 
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          	var name = {_id: decoded._id};
          	var update = {$pull:{phone:{_id:req.params.phone}}};
          	var options = {new: true};
          
          	User.findOneAndUpdate(name, update, options, function(err, data){
          		if (err) {
                return res.status(403).send({success: false, msg: 'Failed to remove phone'});
          		}
          		else {
            		return	res.status(200).send({sucess:true, phone:data.phone});
          		}
          	});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

module.exports = router;