'use strict';
angular.module('GiphyApp', ['ngRoute', 'ngAnimate'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: 'app/views/main.html',
		controller: 'GiphyCtrl'
	});
	// Removing # from url
	// $locationProvider.html5Mode(true).hashPrefix('!');
}])

.controller('GiphyCtrl', function($scope, $http){
	$scope.searchTerm = 'pugs';
	$scope.submit = function() {
		$http({
			url: 'http://api.giphy.com/v1/gifs/search?q=' + $scope.searchTerm + '&api_key=dc6zaTOxFJmzC',
			method: 'GET'
		}).success(function(response) {
			$scope.results = [{
				'id': '1',
				'gif': response.data[0].images.original.url,
				'url': response.data[0].url,
				'bitly': response.data[0].bitly_url
			}, {
				'id': '2',
				'gif': response.data[1].images.original.url,
				'url': response.data[1].url,
				'bitly': response.data[1].bitly_url
			}, {
				'id': '3',
				'gif': response.data[2].images.original.url,
				'url': response.data[2].url,
				'bitly': response.data[2].bitly_url
			}, {
				'id': '4',
				'gif': response.data[3].images.original.url,
				'url': response.data[3].url,
				'bitly': response.data[3].bitly_url
			}, {
				'id': '5',
				'gif': response.data[4].images.original.url,
				'url': response.data[4].url,
				'bitly': response.data[4].bitly_url
			}, {
				'id': '6',
				'gif': response.data[5].images.original.url,
				'url': response.data[5].url,
				'bitly': response.data[5].bitly_url
			}, {
				'id': '7',
				'gif': response.data[6].images.original.url,
				'url': response.data[6].url,
				'bitly': response.data[6].bitly_url
			}, {
				'id': '8',
				'gif': response.data[7].images.original.url,
				'url': response.data[7].url,
				'bitly': response.data[7].bitly_url
			}, {
				'id': '9',
				'gif': response.data[8].images.original.url,
				'url': response.data[8].url,
				'bitly': response.data[8].bitly_url
			}, {
				'id': '10',
				'gif': response.data[9].images.original.url,
				'url': response.data[9].url,
				'bitly': response.data[9].bitly_url
			}];
		}).error(function(data) {
			console.log('Error: ' + data);
		});
	};

	$scope.currentIndex = 0;
	$scope.setCurrentSlideIndex = function(index) {
		$scope.currentIndex = index;
	};
	$scope.isCurrentSlideIndex = function(index) {
		return $scope.currentIndex === index;
	};
	$scope.prevSlide = function () {
		$scope.currentIndex = ($scope.currentIndex < $scope.results.length - 1) ? ++$scope.currentIndex : 0;
	};
	$scope.nextSlide = function () {
		$scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.results.length - 1;
	};
	$scope.submit();

});
