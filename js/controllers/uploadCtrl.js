(function() {
    'use strict';
    angular.module('tmodule', []);
 })();
 
 (function() {
    'use strict';
     angular.module('tmodule').controller('myController', ['$scope', '$http', 'loginService',
             function ($scope, $http,loginService){
                $scope.uploadFile = function(){  
                    var form_data = new FormData();  
                    angular.forEach($scope.files, function(file){  
                         form_data.append('file', file);  
                    });  
                    $http.post('upload.php', form_data,  
                    {  
                         transformRequest: angular.identity,  
                         headers: {'Content-Type': undefined,'Process-Data': false}  
                    }).success(function(response){  
                         alert(response);  
                         $scope.select();  
                    });  
               }  
               $scope.select = function(){  
                    $http.get("select.php")  
                    .success(function(data){  
                         $scope.images = data;  
                         console.log(data)
                    });  
               } 
               
               //fetch login user
                var userrequest = loginService.fetchuser();
                userrequest.then(function(response){
                    $scope.user = response.data[0];
                    console.log($scope.user)
                });

     }]);

     angular.module('tmodule').directive("fileInput", function($parse){  
        return{  
             link: function($scope, element, attrs){  
                  element.on("change", function(event){  
                       var files = event.target.files;  
                       //console.log(files[0].name);  
                       $parse(attrs.fileInput).assign($scope, element[0].files);  
                       $scope.$apply();  
                  });  
             }  
        }  
    });  
 
 })();
 
