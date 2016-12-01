
	var mic = angular.module('mic', ['ngRoute', 'ngCookies','angularMoment']);
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

	mic.controller('mainController', function($scope,$http,$route,userPersistenceService,moment) {
		//set initial limit to 10 items
		$scope.limit= 10;
		$scope.orderByField = userPersistenceService.getCookieData('orderByField');
		$scope.reverseSort = !userPersistenceService.getCookieData('reverseSort');

		//retrieving data from articles.json file
	    $http.get('assets/articles.json')
	        .success(function(data) {
	            $scope.items=data;
	            $scope.length = data.length;
	        })
	        .error(function(data,status,error,config){
	            $scope.items = [{heading:"Error",description:"Could not load json   data"}];
	        });

	    //retrievinf more data from more-articles.json file    
	    $http.get('assets/more-articles.json')
	        .success(function(data1) {
	            $scope.items = $scope.items.concat(data1);
	            $scope.length += data1.length;	
	        })
	        .error(function(data,status,error,config){
	            $scope.items = [{heading:"Error",description:"Could not load json   data"}];
	        });

	    // function to load 10 more items    
	    $scope.loadMore = function() {
		  $scope.limit += 10;
		};

		//setting cookie for sorting field
		$scope.settingOrder = function(orderByField){
			userPersistenceService.setCookieData("orderByField",orderByField);
			return orderByField;
		};

		//setting cookie for order of sorting field
		$scope.settingReverse = function(reverseSort){
			userPersistenceService.setCookieData("reverseSort",reverseSort);
			return reverseSort;
		};

		//parsing json date to date type
		$scope.dateConverter = function(published_at){
			d = new Date(published_at);
			d = JSON.stringify(d);
			return JSON.parse(d);
		};
	});

	//factory to set and get cookies
	mic.factory("userPersistenceService", ["$cookies", function($cookies) {
		return {
			setCookieData: function(key, value) {
		        $cookies.remove(key);	
				$cookies.put(key, value);
			},
			getCookieData: function(key) {
				var data = "";	
				value = $cookies.get(key);
				if(value == undefined){	
					return data;
				}
				return value;
			}
		};
	}]);