	var mic = angular.module('mic', ['ngRoute']);

	// configuring routes
	mic.config(function($routeProvider) {
		$routeProvider

			// route for the product page
			.when('/', {
				templateUrl : 'views/content.html',
				controller  : 'mainController'
			})

			.otherwise({ redirectTo: '/' });
	});

	mic.controller('mainController', function($scope,$http) {
		$scope.limit= 10;
 	 	$scope.orderByField = '';
  		$scope.reverseSort = false;
	    $http.get('assets/articles.json')
	        .success(function(data) {
	            $scope.items=data;
	            $scope.length = data.length;
	        })
	        .error(function(data,status,error,config){
	            $scope.items = [{heading:"Error",description:"Could not load json   data"}];
	        });
	    $scope.loadMore = function() {
		  $scope.limit += 10;
		  if($scope.limit == $scope.length){
		  	 $http.get('assets/more-articles.json')
	        .success(function(data1) {
	            $scope.items = $scope.items.concat(data1);
	            console.log(data1);
	        })
	        .error(function(data,status,error,config){
	            $scope.items = [{heading:"Error",description:"Could not load json   data"}];
	        });
		  }
		};
	});