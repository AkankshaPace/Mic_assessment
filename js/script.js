
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
		$scope.limit= 10;
		$scope.orderByField = userPersistenceService.getCookieData('orderByField');
		$scope.reverseSort = !userPersistenceService.getCookieData('reverseSort');
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
	        })
	        .error(function(data,status,error,config){
	            $scope.items = [{heading:"Error",description:"Could not load json   data"}];
	        });
		  }
		};

		$scope.settingOrder = function(orderByField){
			userPersistenceService.setCookieData("orderByField",orderByField);
			return orderByField;
		};
		$scope.settingReverse = function(reverseSort){
			userPersistenceService.setCookieData("reverseSort",reverseSort);
			return reverseSort;
		};

		$scope.dateConverter = function(published_at){
			d = new Date(published_at);
			d = JSON.stringify(d);
			return JSON.parse(d);
		};
	});

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