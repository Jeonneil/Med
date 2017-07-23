angular.module('starter.controllers',  [])
.controller('TodoController', function($scope, $http){

  $http({
//    url:"http://192.168.8.100/medify/include/getdata.php",
      // url:"http://www.jeonneilblanco.esy.es/php/getdata.php",
       url:"http://localhost/medify/include/getdata.php",
      method:"GET"
    })
    .then(function(response){
      // console.log(response['data']);
      $scope.medlist = response['data'];
    })



$scope.addMed = function(){
  var name = document.getElementById('name').value;
  var quantity = document.getElementById('quantity').value;


  $http({
//        url:"http://192.168.8.100/medify/include/add.php",
    // url:"http://www.jeonneilblanco.esy.es/php/add.php",
     url:"http://localhost/medify/include/add.php",
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
    $http({
//          url:"http://192.168.8.100/medify/include/getdata.php",
        // url:"http://www.jeonneilblanco.esy.es/php/getdata.php",
         url:"http://localhost/medify/include/getdata.php",
        method:"GET"
      })
      .then(function(response){
        // console.log(response['data']);
        $scope.medlist = response['data'];
      })
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

$scope.edit = function(id, name, quantity){
  $scope.add = true;
  $scope.cancel = true;
  document.getElementById('name').value = name;
  document.getElementById('quantity').value = quantity;
  $scope.id = id;
}
$scope.save_edit = function(id, name, quantity){


    $http({
//          url:"http://192.168.8.100/medify/include/edit.php",
    // url:"http://www.jeonneilblanco.esy.es/php/edit.php",
     url:"http://localhost/medify/include/edit.php",
    method:"POST",
    data:{
    'id':id,
    'addname':name,
    'addquantity':quantity
    }
  })
  .then(function(response){
    $http({
//          url:"http://192.168.8.100/medify/include/getdata.php",
        // url:"http://www.jeonneilblanco.esy.es/php/getdata.php",
         url:"http://localhost/medify/include/getdata.php",
        method:"GET"
      })
      .then(function(response){
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

$scope.canceled = function(){
  $scope.add = false;
  $scope.cancel = false;
  document.getElementById('name').value = "";
  document.getElementById('quantity').value = "";
}

$scope.delete = function(id){
  $http({
//        url:"http://192.168.8.100/medify/include/delete.php",
    // url:"http://www.jeonneilblanco.esy.es/php/delete.php",
     url:"http://localhost/medify/include/delete.php",
    method:"POST",
    data:{
    'id':id
    }
  })
  .then(function(response){
    $http({
//          url:"http://192.168.8.100/medify/include/getdata.php",
        // url:"http://www.jeonneilblanco.esy.es/php/getdata.php",
         url:"http://localhost/medify/include/getdata.php",
        method:"GET"
      })
      .then(function(response){
        // console.log(response['data']);
        $scope.medlist = response['data'];
      })
  })
}
})

.controller('SearchController', function($scope, $http){
$scope.search = function(id){
$http({
url:"http://localhost/medify/include/search.php",
method:"GET"
})
.then(function(response){
  $scope.searchlist = response['data'];
})
}
});
