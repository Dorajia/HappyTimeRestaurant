/**
 * Created by xiaotong on 5/5/16.
 */
var app = angular.module('menu',[]);
var hostname = 'https://ec2-52-11-87-42.us-west-2.compute.amazonaws.com';
app.controller('menu_controller', function($scope,$http) {

    var productList= [
        {"_id":"HEL Co","_catalog":"2","price":"3" },
        {"_id":"2","_catalog":"22","price":"33" },
        {"_id":"3","_catalog":"2","price":"3" },
        {"_id":"4","_catalog":"22","price":"33" },
        {"_id":"5","_catalog":"2","price":"3" },
        {"_id":"ac bb","_catalog":"22","price":"33" }
    ]
    $scope.products = productList;
    //alert("succeed2333");

    $scope.slidepic1 = "special-beef.jpg"
    $scope.slidepic2 = "special-Boeuf Bourgignon.jpg"
    $scope.testvalue = "maincourse beef.jpg";
    $scope.slidepic2 = "special-Chop Suey.jpg";
    this.dishes = [];
    var parent = this;
    //var testp = <%- JSON.stringify(catalog)%>;
    //if (testp !="empty") {
    //    //alert("succeed-start parsing");
    //    var testp = <%- JSON.stringify(catalog)%>;
    //    var p2 = JSON.parse(testp);
    //    //alert(':'+p2[0]._id);
    //    //alert("succeed");
    //}
    //var testdish = <%- JSON.stringify(dishes)%>;
    //if (testdish !="empty") {
    //    //alert("succeed-start parsing");
    //    var testp = <%- JSON.stringify(dishes)%>;
    //    $scope.dishes = <%- dishes%>;
    //}



    $scope.viewDetail = function(selectDish){
        /* for(var attr in selectDish ){
         //alert(selectProduct[attr]);
         toModifyProduct[attr]=selectDish[attr];
         }
         //$scope.showDish = toModifyProduct;
         $scope.showDish  = toModifyProduct;	 */

        var dishname = selectDish._id;
        //var dishname = $scope.showDish._id;

        //alert("push local finished");
        //alert(dishname);
        //$scope.pro = {};//empty the modal value
        $http.post('/menudetail/menudetail',{data: dishname})
            .then(function(res){
                //$location.path('menudetail');
                if(res.status == "200"){
                    //alert(res.data);
                    //alert("_id"+res.data._id);
                    //alert(res.status);
                    var resdata= JSON.stringify(res.data); //return project
                    //alert(resdata);
                    window.location="/menudetail?dish=1";
                }
            });





    }
    $scope.dish_list_headline = "Today's Special Dishes ";
    $scope.menu_list = ['starter',
                        'dumpling',
                        'noodle',
                        'rice',
                        'beverage',
                        'dessert',
                        'soup'];
    $scope.getDishByCategory = function(index){
        //console.log($scope.menu_list[index]);
        $scope.dish_list_headline = $scope.menu_list[index];
        $scope.showDishList = true;
        $http.get(hostname + '/dish/findbycatalog/'+ $scope.menu_list[index]).success(function(data){
            parent.dishes = data;
            console.log(parent.dishes );
        }).error(function(err){
            console.log(err);
        });
    }
    $scope.getDishDetail = function(name){
        //console.log($scope.recommendations[index]._id);
        $http.post('/menudetail/menudetail',{data: name})
            .then(function(res){
                //$location.path('menudetail');
                if(res.status == "200"){
                    //alert(res.data);
                    //alert("_id"+res.data._id);
                    //alert(res.status);
                    var resdata= JSON.stringify(res.data); //return project
                    //alert(resdata);
                    window.location="/menudetail?dish=1" ;
                }});
    }

});