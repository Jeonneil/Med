angular.module('starter.controllers',  [])
.controller('TodoController', function($scope, $http){
$scope.addMed = function(){
  var name = document.getElementById('name').value;
  var quantity = document.getElementById('quantity').value;

  
  $http({
    url:"http://localhost/Medify/include/add.php",
    method:"POST",
    data:{
    'addname':name,
    'addquantity':quantity
    }
  })
  .then(function(response){
    console.log(response);
    document.getElementById('name').value = "";
    document.getElementById('quantity').value = "";
  })
};
  
$http({
    url:"http://localhost/medify/include/getdata.php",
    method:"GET"
  })
  .then(function(response){
    console.log(response['data']);
    $scope.medlist = response['data'];
  })  

setInterval(function(){
$http({
    url:"http://localhost/medify/include/getdata.php",
    method:"GET"
  })
  .then(function(response){
    console.log(response['data']);
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
    url:"http://localhost/Medify/include/edit.php",
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
    console.log(response);
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
    url:"http://localhost/Medify/include/delete.php",
    method:"POST",
    data:{
    'id':id
    }
  })
  .then(function(response){

  })
}
});
