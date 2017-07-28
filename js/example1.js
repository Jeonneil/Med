angular.module('starter.controllers',['ionic','ngCordova','ngCordova.plugins.camera','ngCordova.plugins.localNotification','ngCordova.plugins'])
.run(function($ionicPlatform, $rootScope, $timeout) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    window.plugin.notification.local.onadd = function (id, state, json) {
       var notification = {
           id: id,
           state: state,
           json: json
       };
       $timeout(function() {
           $rootScope.$broadcast("$cordovaLocalNotification:added", notification);
       });
   };

  });
})
