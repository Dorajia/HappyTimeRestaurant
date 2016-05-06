var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');
var fs = require('fs');

var awsUrl = "https://ec2-52-11-87-42.us-west-2.compute.amazonaws.com";
var loginStyle = "display";
var logoutStyle = "display:none";

router.get('/', function (req, res) {
	//"awsApiUrl": "http://ec2-52-11-87-42.us-west-2.compute.amazonaws.com",
	console.log(awsUrl + '/dish/getalldish -put');
    if (req.session.token) {
        loginStyle = "display:none";
        logoutStyle = "display";
    }
    else {
        loginStyle = "display";
        logoutStyle = "display:none";
    }
	request.get({
        url: awsUrl + '/dish/getalldish',
        key: fs.readFileSync('cert/key.pem'),
        cert: fs.readFileSync('cert/cert.pem'),
        requestCert: true,
    	rejectUnauthorized: false     
       // form: req.body,
        //json: true
    }, function (error, response, body) {
        if (error) {
            return console.log("error1");
        }

        if (response.statusCode !== 200 ) {
            return console.log("response.statusCode: " + response)
        }
        
       //console.log("response.statusCode: " + response.statusCode);
       
       var jsonob =JSON.parse(response.body)
       for(var indexm in jsonob){
    	   //output dish list
    	   var strm = JSON.stringify(jsonob[indexm]);
    	   console.log("dish: " + strm);    	   
   		}
       
       //var p = JSON.stringify(response.body);
       //console.log("response.body: " + response.body);
   	
       /*for(var indexm in p){
    		for (var indexn in p[indexm]._dish){
    			console.log("dish: " + p[indexm]._dish[indexn]);
    		}
    	}*/
              
       return res.render("menu2",
           {
               catalog:"empty" ,
               dishes: response.body,
               loginStyle: loginStyle,
               logoutStyle: logoutStyle
           }
       );
    });
	/*// log user out
    delete req.session.token;

    // move success message into local variable so it only appears once (single read)
    var viewData = { success: req.session.success };
    delete req.session.success;

    res.render('login', viewData);*/
});





router.get('/:catalog', function (req, res, next) {

    if (req.session.token) {
        loginStyle = "display:none";
        logoutStyle = "display";
        showHover = true;
    }
    else {
        loginStyle = "display";
        logoutStyle = "display:none";
    }


    var url = '';
    var tmp = "\'" + req.params.catalog + "\'";

    if (req.params.catalog != 'alldish'){
        url = '/dish/findbycatalog/' + req.params.catalog;
    }else{
        tmp = "\'" + 'All the Dishes' + "\'";
        url = '/dish/getalldish';
    }
	//http://ec2-52-11-87-42.us-west-2.compute.amazonaws.com/dish/findbycatalog/Noodle
	//console.log(req.params.catalog);
	request.get({
        url: awsUrl + url,//'Noodle', //req.params.catalog,
        key: fs.readFileSync('cert/key.pem'),
        cert: fs.readFileSync('cert/cert.pem'),
        requestCert: true,
    	rejectUnauthorized: false
    }, function (error, response, body) {
        if (error) {
            return console.log("error1");
        }

        if (response.statusCode !== 200 ) {
            return console.log("response.statusCode: " + response)
        }
        //console.log(url);
       //console.log("response.statusCode: " + response.statusCode);

       
       var p = JSON.stringify(response.body);
       //console.log("response.body0-new: " + response.body);
       //console.log("response.body1-new: " + p);
		//

       return res.render('menu_list',
           {
               catalog:"empty",
               dishes: response.body,
               dish_list_headline: tmp,
               loginStyle: loginStyle,
               logoutStyle: logoutStyle
           });
    });
	
	

});


//router.get('/all', function (req, res, next) {
//	request.get({
//		url: awsUrl + '/dish/getalldish',
//		key: fs.readFileSync('cert/key.pem'),
//		cert: fs.readFileSync('cert/cert.pem'),
//		requestCert: true,
//		rejectUnauthorized: false
//	}, function (error, response, body) {
//		if (error) {
//			return console.log("error1");
//		}
//
//		if (response.statusCode !== 200 ) {
//			return console.log("response.statusCode: " + response)
//		}
//        var p = JSON.stringify(response.body);
//        console.log(res.body.length);
//		return res.render('menu_list', {catalog:"empty", dishes: response.body,  dish_list_headline: "\'ALL THE DISHES\'"});
//	});
//
//
//
//});

router.get('/menu', function (req, res) {
    
	res.render("menu_ori");
	/*// log user out
    delete req.session.token;

    // move success message into local variable so it only appears once (single read)
    var viewData = { success: req.session.success };
    delete req.session.success;

    res.render('login', viewData);*/
});

module.exports = router;

/*router.get('/allcatalog', function (req, res) {
//"awsApiUrl": "http://ec2-52-11-87-42.us-west-2.compute.amazonaws.com",
console.log(awsUrl + '/catalog/getallcatalog -put');
request.get({
    url: awsUrl + '/catalog/getallcatalog',
    key: fs.readFileSync('cert/key.pem'),
    cert: fs.readFileSync('cert/cert.pem'),
    requestCert: true,
	rejectUnauthorized: false     
   // form: req.body,
    //json: true
}, function (error, response, body) {
    if (error) {
        return console.log("error1");
    }

    if (response.statusCode !== 200 ) {
        return console.log("response.statusCode: " + response)
    }
    
   console.log("response.statusCode: " + response.statusCode);
   
   var jsonob =JSON.parse(response.body)
   for(var indexm in jsonob){
	   //output catalog list
	   var strm = JSON.stringify(jsonob[indexm]);
	   console.log("dish: " + strm); 
	   //output dishes list in one catalog
		   for (var indexn in jsonob[indexm]._dish){
				console.log("dish: " + JSON.stringify(jsonob[indexm]._dish[indexn]));
			}
		}
   
   //var p = JSON.stringify(response.body);
   console.log("response.body: " + response.body);
	
   for(var indexm in p){
		for (var indexn in p[indexm]._dish){
			console.log("dish: " + p[indexm]._dish[indexn]);
		}
	}
   

   
   return res.render("menu2", {catalog: response.body, dishes: "empty"});
});
// log user out
delete req.session.token;

// move success message into local variable so it only appears once (single read)
var viewData = { success: req.session.success };
delete req.session.success;

res.render('login', viewData);
});*/


