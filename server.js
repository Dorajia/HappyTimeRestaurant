require('rootpath')();

var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// routes
//app.use('/login', require('./controller/login.controller'));
//app.use('/register', require('./controller/register.controller'));
//app.use('/app', require('./controller/app.controller'));
//app.use('/login', require('./app/xiaotong/controller/login.controller'));
//app.use('/register', require('./app/xiaotong/controller/register.controller'));
//app.use('/app', require('./app/xiaotong/controller/app.controller'));
app.use('/login', require('./app/controller/login.controller'));
app.use('/register', require('./app/controller/register.controller'));
app.use('/app', require('./app/controller/app.controller'));


// 05/05/2016, Jiongfeng
app.use('/menu', require('./controller/menu.controller'));
app.use('/menudetail', require('./controller/menudetail.controller'));
app.use("/image",  express.static(__dirname + '/app/image'));
app.use("/css2",  express.static(__dirname + '/app/jiongfeng/css'));
app.use("/js2", express.static(__dirname + '/app/jiongfeng/js'));


// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
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

var items = [{'image':'../images/shopping_cart_pink.png',
    'name':'Yu Xiang Rou Si',
    'description':'This is a traditional sichuan food',
    'price':10.00,
    'amount':1,
    'total':10.00,
    'checked':false},
    {'image':'../images/shopping_cart_pink.png',
        'name':'Wudong Noodle',
        'description':'This is a traditional noodle',
        'price':13.00,
        'amount':1,
        'total':13.00,
        'checked':false},
    {'image':'../images/shopping_cart_pink.png',
        'name':'Kungpo Chicken',
        'description':'This is a delicious sichuan food',
        'price':15.00,
        'amount':3,
        'total':45.00,
        'checked':false},
    {'image':'../images/shopping_cart_pink.png',
        'name':'QQ Noodle',
        'description':'This is a good noodle...try it',
        'price':9.00,
        'amount':4,
        'total':36.00,
        'checked':false}
];


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

app.get('/shoppingCart' , handle_get);

app.get('/cart/getitems' , function(req , res){
    res.json(items);
});

app.delete('/cart/removeitem/:name/:newtotal_price' , function(req, res){
    console.log(req.params.name);
    console.log(req.params.newtotal_price);
    //items.splice(req.body.index, 1);
    //console.log(items);
});
app.post('/cart/changenumber/:name/:newprice/:newnumber/:newtotal_price',function(req, res){
    console.log(req.params.name);
    console.log(req.params.newprice);
    console.log(req.params.newnumber);
    console.log(req.params.newtotal_price);

});

app.post('/generateOrder', function(req, res){
    console.log(req.body.orderItems);
    console.log(req.body.Address);
    console.log(req.body.card);
});

//special
app.post('/cart/checkout', function(req,  res){
    selectedItems = req.body;
    console.log(selectedItems.length)
    //console.log(req.body);
    //console.log(req.params);
    //res.redirect('/cart/checkout');
});

app.get('/cart/checkout', function(req,  res){
    //body = fs.readFileSync(__dirname + '/app/xiaotong/view/Payment.html');
    body = fs.readFileSync(__dirname + '/app/view/checkOut.html');

    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(body);
});

app.get('/paycard/:userName', function(req, res){
    var data = [
        {
            "_id": "572396f606484fcb75d90fa4",
            "user_name": "Dora",
            "card_type": "Debit",
            "card_holder": "YuanYuan Jia",
            "card_number": 329883942322,
            "expire_date": "09/2019",
            "bank_name": "Citi"
        },
        {
            "_id": "572396fd06484fcb75d90fa5",
            "user_name": "Dora",
            "card_type": "credit",
            "card_holder": "YuanYuan Jia",
            "card_number": 365678654492,
            "expire_date": "01/2020",
            "bank_name": "BOA"
        }
    ]

    res.json(data);

});
app.get('/user/getaddress' , function(req , res){
    var data = {
        "sucess": true,
        "delivery_address": [
            {
                "address": "Howold street",
                "state": "CA",
                "zipcode": 44444,
                "receiver":"Judy Hops",
                "phone":"(408)1234567",
                "default": true,
                "_id": "5719a7164cf09c803238781a"
            },
            {
                "address": "34 Union Sq",
                "state": "CA",
                "zipcode": 123456,
                "receiver":"Nick White",
                "default": false,
                "phone":"(408)1234569",
                "_id": "5719a7164cf09c803238781b"
            }
        ]
    };
    res.json(data);
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





