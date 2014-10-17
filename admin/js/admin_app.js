angular.module('admin', ['starter.services', 'ngResource'])
.controller('AdminBootCtrl', function($window, $location, $http) {
  $http({method:'GET', url: '/admin'}).success(function(data, status, headers) {
    window.location = headers('Location');
    console.log(headers('Location'));
  });
})

.controller('AdminCtrl', function($http, $window, $scope, SocketIO, Question, Answer) {

  $scope.scripts = {};
  $scope.pages = {};
  $scope.answers = {};

  $scope.init = function() {
    $http({
        method: 'GET',
        url: "/resource/scripts"
      }).success(function(data) {
        $scope.scripts = data;
    });
    $http({
        method: 'GET',
        url: "/resource/pages"
      }).success(function(data) {
        $scope.pages = data;
    });
    $http({
        method: 'GET',
        url: "/resource/answers"
      }).success(function(data) {
        $scope.answers = data;
    });
  };

  $scope.saveScript = function() {
    return $http({
        method: 'POST',
        data: $scope.script,
        url: "/resource/scripts"
      }).success(function(data) {
          $scope.scripts.push(data);
      });
  };

  $scope.addPage = function() {
    return $http({
        method: 'POST',
        data: $scope.page,
        url: "/resource/pages"
      }).success(function(data) {
          $scope.pages.push(data);
      });
  };

  $scope.addAnswer = function() {
    return $http({
        method: 'POST',
        data: $scope.answer,
        url: "/resource/answers"
      }).success(function(data) {
          $scope.answers.push(data);
      });
  };

})

.config(function($httpProvider) {
  $httpProvider.interceptors.push('TokenInterceptor');
});
