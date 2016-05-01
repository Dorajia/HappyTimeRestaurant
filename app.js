/**
 * Created by xiaotong on 4/18/16.
 */
var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('rootpath')();
app.use("/css",  express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/images",  express.static(__dirname + '/images'));
app.use("/controller",  express.static(__dirname + '/controller'));

//var Client = require('node-rest-client').Client;
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
    body = fs.readFileSync(__dirname + '/view/ShoppingCart.html');
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
});

app.get('/cart/checkout', function(req,  res){
    body = fs.readFileSync(__dirname + '/view/Payment.html');
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(body);
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
                "_id": "5719a7164cf09c803238781a"
            },
            {
                "address": "34 Union Sq",
                "state": "CA",
                "zipcode": 123456,
                "receiver":"Nick White",
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

console.log( "Server running on Port 8080..." ) ;

app.listen(8080);