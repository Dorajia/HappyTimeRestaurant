/**
 * Created by xiaotong on 4/14/16.
 */
var app = angular.module('shopping_cart',[]);

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
var total = 104.00;
app.controller('cartmanager',['$scope','$window', function($scope , $window){
    this.items = items;
    var parent = this;
    $scope.totalPrice = 0;
    $scope.badgeNum = this.items.length;
    $scope.allCheck = false;
    var selectedItems = []
    for(i = 0; i < this.items.length; i ++){
        $scope.totalPrice += this.items[i].price * this.items[i].amount;
    }

    $scope.increment =function(index){

        parent.items[index].amount ++;
        parent.items[index].total += parent.items[index].price;
        $scope.totalPrice += parent.items[index].price;

    };

    $scope.decrement =function(index){
        if(parent.items[index].amount > 1){
            parent.items[index].amount --;
            parent.items[index].total -= parent.items[index].price;
            $scope.totalPrice -= parent.items[index].price;
        }else{
            //$scope.greeting = 'Hello, World!';
            $window.alert('Oops! Amount can not be smaller than one, use trash icon to delete!');
        }
    };

    $scope.delete = function(index){
        $scope.badgeNum -= 1;
        console.log($scope.badgeNum);
        parent.items.splice(index , 1);
        $scope.updatePrice();
    }

    $scope.checkAll = function(){
        //$scope.allCheck = !$scope.allCheck;
        //console.log(value);
        for(i = 0; i < parent.items.length; i ++){
            parent.items[i].checked = $scope.allCheck;
        }
    }

    $scope.updatePrice = function(){
        $scope.totalPrice = 0;
        for(i = 0; i < parent.items.length; i ++){
            $scope.totalPrice += parent.items[i].price * parent.items[i].amount;
        }
    }


}]);

