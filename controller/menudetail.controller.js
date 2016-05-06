var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');
var fs = require('fs');
var url = require('url');

var awsUrl = "https://ec2-52-11-87-42.us-west-2.compute.amazonaws.com";
var dish = {};

router.get('/', function (req, res) {
    console.log("function /");
    console.log(dish);
    res.render('menudetail',{dish: dish});
});

router.get('/getcomment', function (req, res) {
    console.log("function /getcomment");

    request.get({
        url: awsUrl + '/comment/findbydish/' + req.body.data,//'Noodle', //req.params.catalog,
        // form: req.body,
        //json: true
        key: fs.readFileSync('cert/key.pem'),
        cert: fs.readFileSync('cert/cert.pem'),
        requestCert: true,
        rejectUnauthorized: false
    }, function (error, response, body) {
        if (error) {
            return console.log("error1");
        }

        if (response.statusCode !== 200 ) {
            return console.log("response.statusCode: " + response);
        }
        //console.log(url);
        console.log("response.statusCode: " + response.statusCode);

        var p = JSON.stringify(response.body);
        console.log("response.body01-new: " + response.body);
        console.log("response.body12-new: " + p);
        console.log("returne1d");
        var dishComment = response.body;

        return res.send(dishComment);


    });

});

router.post('/menudetail', function (req, res) {
    console.log("function /menudetail");
    console.log(awsUrl + '/dish/findbyname/' + req.body.data);

    request.get({
        url: awsUrl + '/dish/findbyname/' + req.body.data,//'Noodle', //req.params.catalog,
        // form: req.body,
        //json: true
        key: fs.readFileSync('cert/key.pem'),
        cert: fs.readFileSync('cert/cert.pem'),
        requestCert: true,
        rejectUnauthorized: false
    }, function (error, response, body) {
        if (error) {
            return console.log("error1");
        }

        if (response.statusCode !== 200 ) {
            return console.log("response.statusCode: " + response);
        }
        //console.log(url);
        console.log("response.statusCode: " + response.statusCode);

        var p = JSON.stringify(response.body);
        console.log("response.body01-new: " + response.body);
        console.log("response.body12-new: " + p);


        console.log("returne1d");
        dish=response.body;

        return res.send(dish);
        //res.render('menudetail',{ dish:  response.body});
        //return res.render('menudetail', { dish:  response.body});
        //console.log("returne3d");

    });

    //res.render('menudetail');


    //console.log("returne4d");
    //console.log("returne5d");


});


router.post('/addtocart', function (req, res) {
    if (req.session.token) {
        console.log("Valid token");
        request.post({
            //url: config.awsApiUrl + '/user/login/' + req.get('username') + '/' + req.get('password'),
            // /cart/additem/:name/:price/:number/:total_price
            //Authorization: req.session.token,
            url: config.awsApiUrl + '/cart/additem/',
            //form: req.body,
            headers: {
                Authorization: req.session.token
            },
            form: {name: req.body.name, price: req.body.price, description: req.body.description, amount: req.body.quantity},
            json: true,
            key: fs.readFileSync('cert/key.pem'),
            cert: fs.readFileSync('cert/cert.pem'),
            requestCert:        true,
            rejectUnauthorized: false

        }, function (error, response, body) {
            if (error || body.msg != 'Add item in shopping cart successful') {
                return res.render('menu', { error: 'An error occurred' });
            }

            /* if (!body.token) {
             return res.render('menu', { error: 'Username or password is incorrect', username: req.body.username });
             }
             */
            // save JWT token in the session to make it available to the angular app
            //req.session.token = body.token;

            // redirect to returnUrl
            //var returnUrl = req.query.returnUrl && decodeURIComponent(req.query.returnUrl) || '/';

            return;
            //res.redirect('menu');
        });

    }
    else {
        console.log("Invalid token");
        return res.redirect('/login');
    }
    //next();

    // authenticate using api to maintain clean separation between layers
});

module.exports = router;