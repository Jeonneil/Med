angular.module('starter.controllers', ['ionic', 'ngCordova', 'ngCordova.plugins.localNotification', 'ngCordova.plugins'])
  .run(function($ionicPlatform, $rootScope, $timeout) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

      window.plugin.notification.local.onadd = function(id, state, json) {
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
  .controller('TodoController', function($scope, $http, $cordovaDialogs, $cordovaLocalNotification) {

    $scope.$on("$cordovaLocalNotification:added", function(id, state, json) {
      alert("Added a notification");
    });




    //
    //
    // $scope.CurrentTime = function() {
    //
    //   var alarmTime = new Date().toLocaleTimeString('en-US', {
    //     hour12: false,
    //     hour: "numeric",
    //     minute: "numeric"
    //   });
    //   console.log(alarmTime);
    // }

    // $scope.add = function() {
    //   var currentTime = new Date().toLocaleTimeString('en-US', {
    //     hour12: false,
    //     hour: "numeric",
    //     minute: "numeric"
    //   });
    //   var timealarm = document.getElementById('timealarm').value;
    //   var medname = document.getElementById('medname').value;
    //
    //
    //
    //       $http({
    //           //  url:"http://192.168.8.101/medify/include/getdata1.php",
    //           url: "http://www.jeonneilblanco.esy.es/php/getdata1.php",
    //           //  url:"http://localhost/medify/include/getdata1.php",
    //           method: "GET"
    //         })
    //         .then(function(response) {
    //           console.log(response['data']);
    //           $scope.timelist = response['data'];
    //
    //         })
    //
    //
    //
    //   if ( currentTime == $scope.timelist[0]['alarm_time']) {
    //
    //     $cordovaDialogs.beep(1);
    //
    //   }
    //
    // }
    //


    // $scope.add = function() {
    //
    //   $cordovaLocalNotification.add({
    //
    //     message: "You already added one",
    //     title: "Medify",
    //     autoCancel: true,
    //     sound: true
    //   })
    //   $cordovaDialogs.beep(1)
    //
    //   .then(function(response) {
    //     console.log("The notification has been set");
    //   });
    // }
    $scope.add = function() {

      $cordovaLocalNotification.add({

        message: "You already added one.",
        title: "Medify",
        autoCancel: true,
        sound: true
      })
       $cordovaDialogs.beep(1)

      .then(function(response) {
        console.log("The notification has been set");
      });
    }




        $scope.addm = function() {
          var alarmTime = new Date();
          alarmTime.setMinutes(alarmTime.getMinutes() + 2);

          $cordovaLocalNotification.addm({
            id: "1234",
            date: alarmTime,
            message: "Time to take your medicine.",
            title: "Medify",
            autoCancel: true,
            sound: true
          })

          .then(function(response) {
            console.log("The notification has been set");
          });
        }

        $scope.isScheduled = function() {
          $cordovaLocalNotification.isScheduled("1234").then(function(isScheduled) {
            alert("Notification 1234 Scheduled: " + isScheduled);
          });
        }

    $http({
        //  url:"http://192.168.8.101/medify/include/getdata.php",
        url: "http://www.jeonneilblanco.esy.es/php/getdata.php",
        //  url:"http://localhost/medify/include/getdata.php",
        method: "GET"
      })
      .then(function(response) {
        // console.log(response['data']);
        $scope.medlist = response['data'];
      })
    $http({
        //  url:"http://192.168.8.101/medify/include/getdata1.php",
        url: "http://www.jeonneilblanco.esy.es/php/getdata1.php",
        //  url:"http://localhost/medify/include/getdata1.php",
        method: "GET"
      })
      .then(function(response) {
        // console.log(response['data']);
        $scope.timelist = response['data'];
      })



    // $scope.alert = function() {
    //   $cordovaDialogs.beep(1);
    // };




    // FOR ADDMED
    $scope.addMed = function() {
      var name = document.getElementById('name').value;
      var quantity = document.getElementById('quantity').value;


      $http({
          //  url:"http://192.168.8.101/medify/include/add.php",
          url: "http://www.jeonneilblanco.esy.es/php/add.php",
          //  url:"http://localhost/medify/include/add.php",
          method: "POST",
          data: {
            'addname': name,
            'addquantity': quantity
          }
        })
        .then(function(response) {
          // console.log(response);
          document.getElementById('name').value = "";
          document.getElementById('quantity').value = "";
          $http({
              //  url:"http://192.168.8.101/medify/include/getdata.php",
              url: "http://www.jeonneilblanco.esy.es/php/getdata.php",
              //  url:"http://localhost/medify/include/getdata.php",
              method: "GET"
            })
            .then(function(response) {
              // console.log(response['data']);
              $scope.medlist = response['data'];
            })
        })
    };
    $http({
        // url:"http://192.168.8.101/medify/include/getdata.php",
        url: "http://www.jeonneilblanco.esy.es/php/getdata.php",
        // url:"http://localhost/medify/include/getdata.php",
        method: "GET"
      })
      .then(function(response) {
        // console.log(response['data']);
        $scope.medlist = response['data'];
      })

    $scope.edit = function(id, name, quantity) {
      $scope.add = true;
      $scope.cancel = true;
      document.getElementById('name').value = name;
      document.getElementById('quantity').value = quantity;
      $scope.id = id;
    }

    $scope.save_edit = function(id, name, quantity) {


      $http({
          //  url:"http://192.168.8.101/medify/include/edit.php",
          url: "http://www.jeonneilblanco.esy.es/php/edit.php",
          //  url:"http://localhost/medify/include/edit.php",
          method: "POST",
          data: {
            'id': id,
            'addname': name,
            'addquantity': quantity
          }
        })
        .then(function(response) {
          $http({
              //  url:"http://192.168.8.101/medify/include/getdata.php",
              url: "http://www.jeonneilblanco.esy.es/php/getdata.php",
              //  url:"http://localhost/medify/include/getdata.php",
              method: "GET"
            })
            .then(function(response) {
              // console.log(response['data']);
              $scope.medlist = response['data'];
            })
          $scope.add = false;
          $scope.cancel = false;
          // console.log(response);
          document.getElementById('name').value = "";
          document.getElementById('quantity').value = "";
        })
    }

    $scope.canceled = function() {
      $scope.add = false;
      $scope.cancel = false;
      document.getElementById('name').value = "";
      document.getElementById('quantity').value = "";
    }

    $scope.delete = function(id) {
      $http({
          //  url:"http://192.168.8.101/medify/include/delete.php",
          url: "http://www.jeonneilblanco.esy.es/php/delete.php",
          //  url:"http://localhost/medify/include/delete.php",
          method: "POST",
          data: {
            'id': id
          }
        })
        .then(function(response) {
          $http({
              //  url:"http://192.168.8.101/medify/include/getdata.php",
              url: "http://www.jeonneilblanco.esy.es/php/getdata.php",
              //  url:"http://localhost/medify/include/getdata.php",
              method: "GET"
            })
            .then(function(response) {
              // console.log(response['data']);
              $scope.medlist = response['data'];
            })
        })
    }

    //FOR ALARMMED
    $scope.addalarm = function() {
      var timealarm = document.getElementById('timealarm').value;
      var medname = document.getElementById('medname').value;


      $http({
          //  url:"http://192.168.8.101/medify/include/add1.php",
          url: "http://www.jeonneilblanco.esy.es/php/add1.php",
          //  url:"http://localhost/medify/include/add1.php",
          method: "POST",
          data: {
            'addtime': timealarm,
            'alarmname': medname
          }
        })
        .then(function(response) {
          // console.log(response);
          document.getElementById('timealarm').value = "";
          document.getElementById('medname').value = "";
          $http({
              //  url:"http://192.168.8.101/medify/include/getdata1.php",
              url: "http://www.jeonneilblanco.esy.es/php/getdata1.php",
              //  url:"http://localhost/medify/include/getdata1.php",
              method: "GET"
            })
            .then(function(response) {
              // console.log(response['data']);
              $scope.timelist = response['data'];

            })

        })
    };



    $http({
        //  url:"http://192.168.8.101/medify/include/getdata1.php",
        url: "http://www.jeonneilblanco.esy.es/php/getdata1.php",
        //  url:"http://localhost/medify/include/getdata1.php",
        method: "GET"
      })
      .then(function(response) {
        // console.log(response['data']);
        $scope.timelist = response['data'];
      })

    // setInterval(function(){
    // $http({
    //     // url:"http://www.jeonneilblanco.esy.es/php/getdata.php",
    //     url:"http://localhost/medify/include/getdata.php",
    //     method:"GET"
    //   })
    //   .then(function(response){
    //     // console.log(response['data']);
    //     $scope.medlist = response['data'];
    //   })
    // },1000)



    $scope.edit1 = function(id, timealarm, medname) {
      $scope.add1 = true;
      $scope.cancel1 = true;
      document.getElementById('timealarm').value = timealarm;
      document.getElementById('medname').value = medname;
      $scope.id = id;
    }


    $scope.save_edit1 = function(id, timealarm, medname) {


      $http({
          //  url:"http://192.168.8.101/medify/include/edit1.php",
          url: "http://www.jeonneilblanco.esy.es/php/edit1.php",
          //  url:"http://localhost/medify/include/edit1.php",
          method: "POST",
          data: {
            'id': id,
            'addtime': timealarm,
            'alarmname': medname
          }
        })
        .then(function(response) {
          $http({
              //  url:"http://192.168.8.101/medify/include/getdata1.php",
              url: "http://www.jeonneilblanco.esy.es/php/getdata1.php",
              //  url:"http://localhost/medify/include/getdata1.php",
              method: "GET"
            })
            .then(function(response) {
              // console.log(response['data']);
              $scope.timelist = response['data'];
            })
          $scope.add1 = false;
          $scope.cancel1 = false;
          console.log(response);
          document.getElementById('timealarm').value = "";
          document.getElementById('medname').value = "";
        })
    }

    $scope.canceled1 = function() {
      $scope.add1 = false;
      $scope.cancel1 = false;
      document.getElementById('timealarm').value = "";
      document.getElementById('medname').value = "";
    }



    $scope.delete1 = function(id) {
      $http({
          //  url:"http://192.168.8.101/medify/include/delete1.php",
          url: "http://www.jeonneilblanco.esy.es/php/delete1.php",
          //  url:"http://localhost/medify/include/delete1.php",
          method: "POST",
          data: {
            'id': id
          }
        })
        .then(function(response) {
          $http({
              //  url:"http://192.168.8.101/medify/include/getdata1.php",
              url: "http://www.jeonneilblanco.esy.es/php/getdata1.php",
              //  url:"http://localhost/medify/include/getdata1.php",
              method: "GET"
            })
            .then(function(response) {
              // console.log(response['data']);
              $scope.timelist = response['data'];
            })
        })
    }
  })

  .controller('SearchController', function($scope, $http) {

    $http({
        // url:"http://192.168.8.101/medify/include/search.php",
        url: "http://www.jeonneilblanco.esy.es/php/search.php",
        // url:"http://localhost/medify/include/search.php",
        method: "GET"
      })
      .then(function(response) {
        // console.log(response['data']);
        $scope.searchlist = response['data'];
      })

  });
