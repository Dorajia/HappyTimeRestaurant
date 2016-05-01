var app = angular.module('myApp', []);
		app.controller('menu', function($scope,$http) {
			
			var dishList= [
			                 {"id":"1","name":"2","price":"3" },
			                 {"id":"2","name":"22","price":"33" }
			                  ]			
			$scope.dishes = dishList;
			alert("succeed"); 
			/* $http.get('/dishList'
				).success(function(data, status, headers, config) {  
					//do sth after get success
					
				    $scope.dishes = data;
				    for(var attr in data){
						alert(attr+':'+data[attr]);
					}	
					alert("succeed"); 
					//window.location="/";
	    		}).error(function(data, status, headers, config) {  
	        	// 
	    		});   */ 
			
			
			
		});
