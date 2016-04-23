/**
 * Created by xiaotong on 4/18/16.
 */
var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
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

var handle_get = function (req, res) {
    console.log( "Get: ..." ) ;
    body = fs.readFileSync(__dirname + '/view/ShoppingCart.html');
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(body);
}

app.get('/new' , handle_get);
app.get('/getShoppingCart' , function(req , res){
    res.json(items);
});

console.log( "Server running on Port 8080..." ) ;

app.listen(8080);