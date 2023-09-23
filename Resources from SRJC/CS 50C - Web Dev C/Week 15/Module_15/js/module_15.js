var app = angular.module('portfolioApp', ['ngTouch']);
app.controller('portfolioController', function($scope, $http) {

  $http.get("data/portfolioSlides.json").then(function(response) {
    $scope.portfolioSlides = response.data;
  });

  $scope.currentIndex = 0;

  $scope.setCurrentSlideIndex = function(index) {
    $scope.currentIndex = index;
  };

  $scope.isCurrentSlideIndex = function(index) {
    return $scope.currentIndex === index;
  };

  $scope.prevSlide = function() {
    $scope.currentIndex = ($scope.currentIndex < $scope.portfolioSlides.length - 1) ? ++$scope.currentIndex : 0;
  };

  $scope.nextSlide = function() {
    $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.portfolioSlides.length - 1;
  };

  $scope.gotoSite = function() {
    location.href = $scope.portfolioSlides[$scope.currentIndex].link;
  }
});
