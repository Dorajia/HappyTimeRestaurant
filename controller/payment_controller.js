/**
 * Created by xiaotong on 4/14/16.
 */
var app = angular.module('payment',[]);

app.controller('payment_controller',['$scope','$http',function($scope, $http){
    this.orders = [{'name':'Yu Xiang Rou Si',
                    'amount': 2,
                    'price': 15},
                   {'name': 'QQ Noodle',
                   'amount':4,
                   'price':9}];
    var parent = this;
    $scope.complete = false;
    $scope.progressStyle = "{width:'33%'}";
    $scope.progress = 33;
    $scope.pageCtrl = 0;
    $scope.addNewAddress = false;
    $scope.previousClass = "previous disabled";
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
}]);