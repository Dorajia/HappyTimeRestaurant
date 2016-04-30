/**
 * Created by xiaotong on 4/14/16.
 */
var app = angular.module('payment',[]);
//var hostname = 'http://ec2-52-11-87-42.us-west-2.compute.amazonaws.com';
var hostname = 'http://localhost:3000';
app.controller('payment_controller',['$scope','$http',function($scope, $http){
    this.orders = [{'name':'Yu Xiang Rou Si',
        'amount': 2,
        'price': 15},
        {'name': 'QQ Noodle',
            'amount':4,
            'price':9}];
    var parent = this;
    $scope.anynum = 0;
    this.addresses = [];
    $scope.complete = false;
    $scope.progressStyle = "{width:'33%'}";
    $scope.progress = 33;
    $scope.pageCtrl = 0;
    $scope.addNewAddress = false;
    $scope.previousClass = "previous disabled";
    this.shipAddress = this.addresses[0];
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
    $scope.continue = function(){
        if($scope.pageCtrl < 3){
            $scope.pageCtrl += 1;
            $scope.previousClass = "previous";
        }

        if($scope.pageCtrl == 3){
            $scope.complete = true;
        }else{
            $scope.progress = ($scope.pageCtrl + 1) * 33;
            console.log($scope.progressStyle);
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
        $http.get(hostname + '/selectedItems')
            .success(function(data){
                //console.log(data);
                parent.orders = data;
                //$scope.badgeNum = this.items.length;
                console.log(parent.orders);

            }).error(function(err){
            console.log('Err: ' + err);
        });

        $http.get(hostname + '/user/getaddress')
            .success(function(data){
                console.log(data);
                parent.addresses = data.delivery_address;
                parent.shipAddress = parent.addresses[0];
                console.log(parent.shipAddress)
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
        var tmp = {};
        tmp.receiver = $scope.newAddress.receiver;
        tmp.address = $scope.newAddress.address1 + $scope.newAddress.address2 + $scope.newAddress.city;
        tmp.state =  $scope.newAddress.state;
        tmp.zipcode = $scope.newAddress.zip;
        tmp.phone = $scope.newAddress.phone;
        parent.addresses.push(tmp);
        parent.shipAddress = tmp;
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

    $scope.changeShippingAddress = function(){
        parent.shipAddress = parent.addresses[$scope.anynum];
    };

}]);