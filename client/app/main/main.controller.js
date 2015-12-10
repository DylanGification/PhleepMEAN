'use strict';

angular.module('phleepMeanApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.homeThings = [];
    $scope.workThings = [];
    $scope.personalThings = [];

    $http.get('/api/categories/home').success(function(homeThings) {
      $scope.homeThings = homeThings;
      socket.syncUpdates('home', $scope.homeThings);
    });

    $http.get('/api/categories/work').success(function(workThings) {
      $scope.workThings = workThings;
      socket.syncUpdates('work', $scope.workThings);
    });

    $http.get('/api/categories/personal').success(function(personalThings) {
      $scope.personalThings = personalThings;
      socket.syncUpdates('personal', $scope.personalThings);
    });

    $scope.deleteHomeThing = function(home) {
      $http.delete('/api/categories/home/' + home._id);
    };

    $scope.deleteWorkThing = function(work) {
      $http.delete('/api/categories/work/' + work._id);
    };

    $scope.deletePersonalThing = function(personal) {
      $http.delete('/api/categories/personal/' + personal._id);
    };

    $scope.addHomeThing = function() {
      if($scope.newHomeName === '') {
        return;
      }
      if($scope.newHomeInfo === '') {
        return;
      }
      $http.post('/api/categories/home', {
        name: $scope.newHomeName,
        info: $scope.newHomeInfo
      });
      $scope.newHomeName = '';
      $scope.newHomeInfo = '';
    };

    $scope.addWorkThing = function() {
      if($scope.newWorkName === '') {
        return;
      }
      if($scope.newWorkInfo === '') {
        return;
      }
      $http.post('/api/categories/work', {
        name: $scope.newWorkName,
        info: $scope.newWorkInfo
      });
      $scope.newWorkName = '';
      $scope.newWorkInfo = '';
    };

    $scope.addPersonalThing = function() {
      if($scope.newPersonalName === '') {
        return;
      }
      if($scope.newPersonalInfo === '') {
        return;
      }
      $http.post('/api/categories/personal', {
        name: $scope.newPersonalName,
        info: $scope.newPersonalInfo
      });
      $scope.newPersonalName = '';
      $scope.newPersonalInfo = '';
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('personal', 'home', 'work');
    });
  });
