/**
 * Created by xiaotong on 4/14/16.
 */
var app = angular.module('payment',[]);
var hostname = 'https://ec2-52-11-87-42.us-west-2.compute.amazonaws.com';
//var hostname = 'http://localhost:3000';
app.controller('payment_controller',['$scope','$http', '$window',function($scope, $http, $window){
    $http.defaults.headers.common.Authorization = "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiJ0ZXN0dXNlciIsInBhc3N3b3JkIjoiJDJhJDEwJC8wYW5TT1pKbVAyRXJaV2V0d1lZTS5tMktKcjZHOW9rQ3lJTTBWcWJucGpOMTdodkZmL2UyIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiZGVsaXZlcnlfYWRkcmVzcyI6W10sIl9fdiI6MCwiX2RlbGl2ZXJ5X2FkZHJlc3MiOltdLCJwaG9uZSI6W3siX2lkIjoxMjM0NX1dfQ.urk51-SRuYecTycrzwYjgSbkh7_q6yHfCQduTnUo7eg";
    this.orders = [{'name':'Yu Xiang Rou Si',
        'amount': 2,
        'price': 15},
        {'name': 'QQ Noodle',
            'amount':4,
            'price':9}];
    var parent = this;
    $scope.anynum = 0;
    this.addresses = [];
    $scope.menu_list = ['starter',
        'dumpling',
        'noodle',
        'rice',
        'beverage',
        'dessert',
        'soup'];
    $scope.complete = false;
    $scope.progressStyle = "{width:'33%'}";
    $scope.progress = 33;
    $scope.pageCtrl = 0;
    $scope.addNewAddress = false;
    $scope.addCard = false;
    $scope.previousClass = "previous disabled";
    $scope.cardChoice = 0;
    $scope.recommendations = []
    this.cards =[];
    this.shipAddress = this.addresses[0];
    this.payCard = this.cards[0];
    this.shipCard = '';
    $scope.newAddress = {
        'receiver':'',
        'address1':'',
        'address2':'',
        'city':'',
        'state':'',
        'zip':'',
        'phone':'',
    };
    $scope.finalPrice = 0;
    $scope.continue = function(){
        if($scope.pageCtrl < 3){
            $scope.pageCtrl += 1;
            $scope.previousClass = "previous";
        }

        if($scope.pageCtrl == 3){
            $scope.complete = true;
            $scope.generateOrder();
        }else{
            $scope.progress = ($scope.pageCtrl + 1) * 33;
            //console.log($scope.progressStyle);
        }
        if($scope.pageCtrl == 0){
            $scope.progressStyle = "{width:'33%'}";
        }else if($scope.pageCtrl == 1){
            $scope.progressStyle = "{width:'66%'}";
        }else{
            $scope.progressStyle = "{width:'100%'}";
        }
    }
    $scope.back = function(){
        if($scope.pageCtrl >= 1){
            $scope.pageCtrl -= 1;
        }
        if($scope.pageCtrl == 0){
            $scope.previousClass = "previous disabled";
        }
        $scope.progress = ($scope.pageCtrl + 1) * 33;
        if($scope.pageCtrl == 0){
            $scope.progressStyle = "{width:'33%'}";
        }else if($scope.pageCtrl == 1){
            $scope.progressStyle = "{width:'66%'}";
        }else{
            $scope.progressStyle = "{width:'100%'}";
        }
    }

    $scope.getSelectedItems = function(){
        $http.get("http://localhost:3000" + '/selectedItems')
            .success(function(data){
                //console.log(data);
                parent.orders = data;
                //$scope.badgeNum = this.items.length;
                //console.log(parent.orders);
                for(i = 0 ; i < parent.orders.length ; i ++){
                    $scope.finalPrice += parent.orders[i].amount * parent.orders[i].price;
                }

            }).error(function(err){
            console.log('Err: ' + err);
        });

        $http.get(hostname + '/delivery/getaddress')
            .success(function(data){
                //console.log(data);
                parent.addresses = data.delivery_address;
                parent.shipAddress = parent.addresses[0];
                for(i = 0 ; i < parent.addresses.length ; i ++){
                    if(parent.addresses[i].isdefault){
                        parent.shipAddress = parent.addresses[i];
                    }
                }
                //console.log(parent.shipAddress)
                //$scope.badgeNum = this.items.length;
            }).error(function(err){
            console.log('Err: ' + err);
        });

        $http.get(hostname + '/paycard/')
            .success(function(data){
                //console.log(data);
                parent.cards= data;
                //console.log((parent.cards[0].card_number + '').substring(-4));
                //parent.shipAddress = parent.addresses[0];
                //f(parent.shipAddress)
                //$scope.badgeNum = this.items.length;
            }).error(function(err){
            console.log('Err: ' + err);
        });

    };

    $scope.cancelAddNewAddress = function(){
        $scope.addNewAddress = false;
        $scope.newAddress = {};
    };

    $scope.addAddress = function(){
        //var tmp = {};
        //tmp.receiver = $scope.newAddress.receiver;
        //tmp.address = $scope.newAddress.address1 + $scope.newAddress.address2 + $scope.newAddress.city;
        //tmp.state =  $scope.newAddress.state;
        //tmp.zipcode = $scope.newAddress.zip;
        //tmp.phone = $scope.newAddress.phone;
        var data = $scope.newAddress;
        data.isderault = false;
        $http.post(hostname + '/delivery/addaddress',data)
            .success(function(data){

        }).error(function(err){
            console.log('Err: ' + err);
        });
        parent.addresses.push(data);
        parent.shipAddress = data;
        $scope.anynum = parent.addresses.length - 1;
        $scope.addNewAddress = false;
        $scope.newAddress = {
            'receiver':'',
            'address1':'',
            'address2':'',
            'city':'',
            'state':'',
            'zip':'',
            'phone':'',
        };
    };

    $scope.changeShippingAddress = function(index){
        //console.log(index);
        parent.shipAddress = parent.addresses[index];
        //console.log(parent.shipAddress)
    };

    $scope.addNewCard = function(){
        //var tmp = {};
        //tmp.card_holder = $scope.newCard.card_holder;
        //tmp.card_number = $scope.newCard.card_number;
        //tmp.card_type = $scope.newCard.card_type;
        //tmp.expire_date = $scope.newCard.expire_date;
        //tmp.bank_name = $scope.newCard.bank_name;
        $http.post(hostname + '/paycard/' + $scope.newCard.card_type + '/' + $scope.newCard.card_holder + '/' + $scope.newCard.card_number
                + '/' + $scope.newCard.expire_date + '/' + $scope.newCard.bank_name).success(function(data){

        }).error(function(err){
            console.log('Err: ' + err);
        });
        ///paycard/:type/:holder/:cardNo/:expireDate/:bankName

        parent.cards.push($scope.newCard);
        $scope.cardChoice = parent.cards.length - 1;
        $scope.addCard = false;
        $scope.newCard = {};
    }

    $scope.cancelAddCard = function(){
        $scope.addCard = false;
        $scope.newCard = {};
    }

    $scope.deleteCard = function(index){
        $http.delete(hostname + '/paycard/' + parent.cards[index].card_number).success(function(data){

        }).error(function(err){
            console.log('Err: ' + err);
        });
        parent.cards.splice(index , 1);
    }

    $scope.generateOrder = function(){
        var data = {
            'address': parent.shipAddress,
            //'phone':1234567,
            'card': parent.payCard,
            'orderItems': parent.orders,
            'totalprice': $scope.finalPrice
        }
        //$http.post(hostname + '/cart/placeorder', data)
        //    .success(function(data){
        //        console.log(data);
        //        //parent.addresses = data.delivery_address;
        //        //parent.shipAddress = parent.addresses[0];
        //        console.log(parent.shipAddress)
        //        //$scope.badgeNum = this.items.length;
        //    }).error(function(err){
        //    console.log('Err: ' + err);
        //});
        var path = '';
        for(i = 0 ; i < parent.orders.length ; i ++){
            path += parent.orders[i]._id + ',';
        }
        if(path.length > 0){
            path = path.substring(0, path.length - 1);
        }
        //console.log(path);
        //console.log(parent.orders.length);
        $http.get(hostname + '/recommendation/' + path).success(function(data){
        //$http.get(hostname + '/recommendation/Ramen,Beef Noodle').success(function(data){
                if(data.length != 0){
                    for(i = 0 ; i < Math.min(data.length , 4) ; i ++){
                        $scope.recommendations.push(data[i]);
                    }
                    console.log($scope.recommendations)
                }else{
                    console.log('no recommendation');
                }
            }).error(function(err){
                console.log('Err: ' + err);
            });
        //}
    }
    $scope.changePayCard= function(index){
        parent.payCard = parent.cards[index];
        //console.log(index);
    };
    $scope.getDishDetail = function(index){
        //$http.get('/getDishDetail/' + $scope.recommendations[index]._id).success(function(data){
        //    //console.log('get successfully')
        //    //$window.location.= '/cart/checkout';
        //    $window.location = '/menu2.ejs';
        //}).error(function(err){
        //    console.log('Err: ' + err);
        //});
        //var dishname = selectDish._id;
        //var dishname = $scope.showDish._id;

        //alert("push local finished");
        //alert(dishname);
        //$scope.pro = {};//empty the modal value
        $http.post('/menudetail/menudetail',{data: 'Ramen'})
            .then(function(res){
                //$location.path('menudetail');
                if(res.status == "200"){
                    //alert(res.data);
                    //alert("_id"+res.data._id);
                    //alert(res.status);
                    var resdata= JSON.stringify(res.data); //return project
                    //alert(resdata);
                    window.location="/menudetail?dish=1";
                }});
    }
}]);