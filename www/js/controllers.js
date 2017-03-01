angular.module('starter.controllers', ['ionic.cloud'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $ionicPush, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    $http.post('https://dev.wfosaas.com/public/user/login', $scope.loginData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function(response) {
      console.log('Logged in!!!!');
      $ionicPush.register().then(function(t) {
        return $ionicPush.saveToken(t);
      }).then(function(t) {
        console.log('Token saved:', t.token);
      });
    });

  $scope.$on('cloud:push:notification', function(event, data) {
    var msg = data.message;
    console.log(msg.title + ': ' + msg.text);
    //to redirect to page
    //$state.go(data.message.payload.redirectState);
  });

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
});
