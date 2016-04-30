/**
 * Created by xiaotong on 4/14/16.
 */

var app = angular.module('shopping_cart',[]);
//var hostname = 'http://ec2-52-11-87-42.us-west-2.compute.amazonaws.com';
var hostname = 'http://localhost:3000';

app.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
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
console.log(items[1]);
//var total = 104.00;
app.controller('cartmanager',['$scope','$window', '$http', function($scope , $window , $http){
    this.items = [];
    var parent = this;
    $scope.totalPrice = 0;
    $scope.badgeNum = this.items.length;
    $scope.allCheck = false;
    //var hostname = 'http://demo3227827.mockable.io/'
    var selectedItems = []
    //for(i = 0; i < this.items.length; i ++){
    //    $scope.totalPrice += this.items[i].price * this.items[i].amount;
    //}

    $scope.increment =function(index){

        parent.items[index].amount ++;
        parent.items[index].total += parent.items[index].price;
        //$http({
        //    method: 'POST',
        //    url: hostname + '/cart/changenumber/:name/:newprice/:newnumber/:newtotal_price',
        //    data:{i: 'ee'},
        //    headers: {
        //        'Content-Type': 'application/x-www-form-urlencoded'
        //    },
        //    //data: {"hello"}
        //}).then(function successCallback(response) {
        //    // this callback will be called asynchronously
        //    // when the response is available
        //}, function errorCallback(response) {
        //
        //});
        $http.post(hostname + '/cart/changenumber/'+
                parent.items[index].name + '/'+
                parent.items[index].price + '/'+
                parent.items[index].amount + '/'+
                parent.items[index].price * parent.items[index].amount)
            .success(function(data){
                console.log(data);
            }).error(function(err){
            console.log('Err: ' + err);
        });
        $scope.updatePrice();
    };

    $scope.decrement =function(index){
        if(parent.items[index].amount > 1){
            parent.items[index].amount --;
            parent.items[index].total -= parent.items[index].price;
            //$scope.totalPrice -= parent.items[index].price;
            //var data = $.param({
            //    json: JSON.stringify({
            //        index: index
            //    })
            //});
            $http.post(hostname + '/cart/changenumber/'+
                                    parent.items[index].name + '/'+
                                    parent.items[index].price + '/'+
                                    parent.items[index].amount + '/'+
                                    parent.items[index].price * parent.items[index].amount)
                .success(function(data){
                    console.log(data);
                }).error(function(err){
                console.log('Err: ' + err);
            });
            $scope.updatePrice();
        }else{
            $window.alert('Oops! Amount can not be smaller than one, use trash icon to delete!');
        }

    };

    $scope.delete = function(index){
        $scope.badgeNum -= 1;
        console.log($scope.badgeNum);
        $http.delete(hostname + '/cart/removeitem/'+parent.items[index].name + '/' + parent.items[index].amount * parent.items[index].price)
            .success(function(data){
                console.log(data);
            }).error(function(err){
            console.log('Err: ' + err);
        });
        parent.items.splice(index , 1);
        $scope.updatePrice();
    }

    $scope.checkAll = function(){
        for(i = 0; i < parent.items.length; i ++){
            parent.items[i].checked = $scope.allCheck;
        }
        $scope.updatePrice();
    }

    $scope.updatePrice = function(){
        $scope.totalPrice = 0;
        for(i = 0; i < parent.items.length; i ++){
            if(parent.items[i].checked) {
                $scope.totalPrice += parent.items[i].price * parent.items[i].amount;
            }
        }
    }

    $scope.getShoppingCart = function(){
        $http.get(hostname + '/cart/getitems')
            .success(function(data){
                //console.log(data);
                parent.items = data;
                $scope.badgeNum = this.items.length;
            }).error(function(err){
                console.log('Err: ' + err);
        });
    }

    $scope.checkOut = function(){
        //console.log(parent.items.length)
        for(i = 0; i < parent.items.length; i ++){
            //console.log(parent.items[i].checked);
            if(parent.items[i].checked){
                selectedItems.push(parent.items[i]);
            }
        }
        //console.log(selectedItems.length);
        $http.post('/cart/checkout', selectedItems).success(function(data){
            console.log('check out success');
        }).error(function(err){
            console.log('Err: ' + err);
        })
    };
}]);



