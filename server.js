require('rootpath')();

var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var hostname = 'https://ec2-52-11-87-42.us-west-2.compute.amazonaws.com';

app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/view');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// routes
app.use('/login', require('./controller/login.controller'));
app.use('/register', require('./controller/register.controller'));
app.use('/app', require('./controller/app.controller'));
//app.use('/login', require('./app/xiaotong/controller/login.controller'));
//app.use('/register', require('./app/xiaotong/controller/register.controller'));
//app.use('/app', require('./app/xiaotong/controller/app.controller'));
//app.use('/login', require('./controller/login.controller.js'));
//app.use('/register', require('./controller/register.controller.js'));
//app.use('/app', require('./controller/app.controller.js'));


// 05/05/2016, Jiongfeng
app.use('/menu', require('./controller/menu.controller'));
app.use('/menudetail', require('./controller/menudetail.controller'));
app.use("/image",  express.static(__dirname + '/app/image'));
app.use("/css2",  express.static(__dirname + '/app/jiongfeng/css'));
app.use("/js2", express.static(__dirname + '/app/jiongfeng/js'));


// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/menu');
});


//Xiaotong Part Start : 04/28/2016
var fs = require('fs');
app.use("/css",  express.static(__dirname + '/app/css'));
app.use("/js", express.static(__dirname + '/app/js'));
app.use("/images",  express.static(__dirname + '/app/images'));
app.use("/image",  express.static(__dirname + '/app/image'));

app.use("/controller",  express.static(__dirname + '/app/controller'));
app.use("/fonts",  express.static(__dirname + '/app/fonts'));
app.use("/img",  express.static(__dirname + '/app/img'));


var selectedItems = []
var handle_get = function (req, res) {
    console.log( "Get: ..." ) ;
    //body = fs.readFileSync(__dirname + '/app/xiaotong/view/ShoppingCart.html');
    body = fs.readFileSync(__dirname + '/app/view/blog.html');

    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(body);
}
var queryString = require( "querystring" );
var url = require( "url" );

//app.get('/shoppingCart' , handle_get);
app.get('/app/shoppingCart' , handle_get);


//special
app.post('/cart/checkout', function(req,  res){
    selectedItems = req.body;
    console.log(selectedItems.length)
    //console.log(req.body);
    //console.log(req.params);
    //res.redirect('/cart/checkout');
});

//app.get('/cart/checkout', function(req,  res){
app.get('/app/cart/checkout', function(req,  res){
    //body = fs.readFileSync(__dirname + '/app/xiaotong/view/Payment.html');
    body = fs.readFileSync(__dirname + '/app/view/checkOut.html');

    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(body);
});


app.get('/selectedItems' , function(req , res){
    console.log(selectedItems.length);
    res.json(selectedItems);
});

//Xiaotong Part End : 04/28/2016



// start server
var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});


// Add support for Https
var http = require('http');
var https = require('https');
var fs = require('fs');
var options = {
    key: fs.readFileSync('cert/key.pem'),
    cert: fs.readFileSync('cert/cert.pem')
};

//http.createServer(app).listen(process.env.PORT || 3000);

// Option 1
//var server = https.createServer(options, app).listen(process.env.PORT || 3000, function() {
//var server = https.createServer(options, app).listen(process.env.PORT, function() {
//    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
//});
//





