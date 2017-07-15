angular.module('starter.controllers',  [])
.controller('TodoController', function($scope, $http, $ionicActionSheet, $timeout){
  // $scope.addNotification = function () {
  //   var now = new Date().getTime();
  //   var _5_seconds_from_now = new Date(now + 5*1000);
  //   var event = {
  //     id: 1,
  //     at: _5_seconds_from_now,
  //     title: "Test Event",
  //     text: "this is a message about the event"
  //   };
  //
  //
  //
  // };


  // // Triggered on a button click, or some other target
  // $scope.show = function(a) {
  //
  //   // Show the action sheet
  //   var hideSheet = $ionicActionSheet.show({
  //     buttons: [
  //       { text: '<b>Share</b> This' },
  //       { text: 'Edit' }
  //     ],
  //     destructiveText: 'Delete',
  //     titleText: 'Modify your Medicine List',
  //     cancelText: 'Cancel',
  //     cancel: function() {
  //          // add cancel code..
  //        },
  //     destructiveButtonClicked: function(){
  //       console.log(a.medicine_list_ID);
  //       $http({
  //         url:"http://www.jeonneilblanco.esy.es/php/delete.php",
  //         method:"POST",
  //         data:{
  //         'id':a.medicine_list_ID
  //         }
  //       })
  //       .then(function(response){
  //         return true;
  //       })
  //     } ,
  //
  //     destructiveButtonClickedEdit: function(){
  //       console.log(a.medicine_list_ID);
  //       $http({
  //       url:"http://www.jeonneilblanco.esy.es/php/edit.php",
  //       method:"POST",
  //       data:{
  //       'id':id,
  //       'addname':name,
  //       'addquantity':quantity
  //       }
  //     })
  //     .then(function(response){
  //       $scope.add = false;
  //       $scope.cancel = false;
  //       // console.log(response);
  //       document.getElementById('name').value = "";
  //       document.getElementById('quantity').value = "";
  //     })
  //     } ,
  //
  //     buttonClicked: function(index) {
  //       return true;
  //     }
  //   });
  //
  //   // For example's sake, hide the sheet after two seconds
  //   $timeout(function() {
  //     hideSheet();
  //   }, 1500);
  //
  // };

$scope.addMed = function(){
  var name = document.getElementById('name').value;
  var quantity = document.getElementById('quantity').value;


  $http({
    url:"http://www.jeonneilblanco.esy.es/php/add.php",
    method:"POST",
    data:{
    'addname':name,
    'addquantity':quantity
    }
  })
  .then(function(response){
    // console.log(response);
    document.getElementById('name').value = "";
    document.getElementById('quantity').value = "";
  })
};

// $http({
//     url:"http://localhost/medify/include/getdata.php",
//     method:"GET"
//   })
//   .then(function(response){
//     // console.log(response['data']);
//     $scope.medlist = response['data'];
//   })

setInterval(function(){
$http({
    url:"http://www.jeonneilblanco.esy.es/php/getdata.php",
    method:"GET"
  })
  .then(function(response){
    // console.log(response['data']);
    $scope.medlist = response['data'];
  })
},1000)

$scope.edit = function(id, name, quantity){
  $scope.add = true;
  $scope.cancel = true;
  document.getElementById('name').value = name;
  document.getElementById('quantity').value = quantity;
  $scope.id = id;
}
$scope.save_edit = function(id, name, quantity){


    $http({
    url:"http://www.jeonneilblanco.esy.es/php/edit.php",
    method:"POST",
    data:{
    'id':id,
    'addname':name,
    'addquantity':quantity
    }
  })
  .then(function(response){
    $scope.add = false;
    $scope.cancel = false;
    // console.log(response);
    document.getElementById('name').value = "";
    document.getElementById('quantity').value = "";
  })
}

$scope.canceled = function(){
  $scope.add = false;
  $scope.cancel = false;
  document.getElementById('name').value = "";
  document.getElementById('quantity').value = "";
}

$scope.delete = function(id){
  $http({
    url:"http://www.jeonneilblanco.esy.es/php/delete.php",
    method:"POST",
    data:{
    'id':id
    }
  })
  .then(function(response){

  })
}
})
.controller('MyController', function($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
});
