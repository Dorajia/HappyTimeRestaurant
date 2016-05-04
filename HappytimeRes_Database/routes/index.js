var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send({success:true,msg:"I am alive"});
});

module.exports = router;
