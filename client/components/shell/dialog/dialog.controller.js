'use strict';

angular.module('phleepMeanApp')
  .controller('DialogController', function ($scope, $mdDialog, $http) {
  $scope.closeDialog = function() {
    $mdDialog.hide();
  };
});
