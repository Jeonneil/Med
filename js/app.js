angular.module('starter', ['ionic', 'starter.controllers','ngCordova'])
.config(function($stateProvider, $urlRouterProvider){
$stateProvider
.state('app', {
  url:'/app',
  abstract:true,
  templateUrl:'templates/menu.html'
})
.state('app.notification',{
  url:'/notification',
  views:{
    'menuContent':{
      templateUrl:'templates/notification.html',
    }
  }
})
.state('app.alarmMed',{
  url:'/alarmMed',
  views:{
    'menuContent':{
      templateUrl:'templates/alarmMed.html',
    }
  }
})
.state('app.addMed',{
  url:'/addMed',
  views:{
    'menuContent':{
      templateUrl:'templates/addMed.html',
    }
  }
})



.state('app.meansMed',{
  url:'/meansMed',
  views:{
    'menuContent':{
      templateUrl:'templates/meansMed.html',
    }
  }
});

  $urlRouterProvider.otherwise('/app/alarmMed');
});
