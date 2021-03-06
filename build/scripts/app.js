'use strict';

// Storing Angular module in a variable with ngRoute dependency
var app = angular.module('GiphyApp', ['ngRoute']);

// Configuartion for route and location providers
app.config(['$routeProvider', function($routeProvider) {

  // Configures route for the main page
  $routeProvider.when('/', {
    templateUrl: 'views/main.html',
    controller: 'GiphyCtrl'
  })

  // Redirect to main page if no other route is available
  .otherwise({
    redirectTo: '/'
  });
}]);

// Controller that invokes the scope and http objects
app.controller('GiphyCtrl', function($scope, $http) {

  // Title and default search values
  $scope.appName = 'Giphy Search';
  $scope.searchTerm = 'pugs';

  // Submit function searches Giphy API for searchTerm input
  $scope.submit = function() {

    // $http makes request to server at the url and uses get method to return a response
    $http({
      url: 'https://api.giphy.com/v1/gifs/search?q=' + $scope.searchTerm + '&api_key=dc6zaTOxFJmzC',
      method: 'GET'
    })

    // Results retrieved from API data
    .success(function(response) {

      // Go through response.data, format the object, and store it into a new array in $scope.results
      $scope.results = response.data.map(function(value) {
        return {
          'gif': value.images.original.url,
          'url': value.url,
          'bitly': value.bitly_url
        }
      });
    })
    
    // .success(function(response) {
    //   $scope.results = [{
    //     'gif': response.data[0].images.original.url,
    //     'url': response.data[0].url,
    //     'bitly': response.data[0].bitly_url
    //   }, {
    //     'gif': response.data[1].images.original.url,
    //     'url': response.data[1].url,
    //     'bitly': response.data[1].bitly_url
    //   }, {
    //     'gif': response.data[2].images.original.url,
    //     'url': response.data[2].url,
    //     'bitly': response.data[2].bitly_url
    //   }, {
    //     'gif': response.data[3].images.original.url,
    //     'url': response.data[3].url,
    //     'bitly': response.data[3].bitly_url
    //   }, {
    //     'gif': response.data[4].images.original.url,
    //     'url': response.data[4].url,
    //     'bitly': response.data[4].bitly_url
    //   }];
    // })

    // Handles errors and displays status code
    .error(function(data) {
      $scope.data = response.data || 'Request failed';
      $scope.status = response.meta.status;
      console.log('Error: ' + $scope.status);
    });
  };

  // Controls for slideshow, set by assigning index value based on number of results
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

  // Runs submit function for default searchTerm when page loads
  $scope.submit();
});
