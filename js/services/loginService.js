'use strict';

app.factory('loginService', function($http, $location, sessionService){
	return{
		login: function(user, $scope){
			var validate = $http.post('login.php', user);
			validate.then(function(response){
				var uid = response.data.user;
				if(uid){
					sessionService.set('user',uid);
					$location.path('/home');
				}
				
				else{
					$scope.successLogin = false;
					$scope.errorLogin = true;
					$scope.errorMsg = response.data.message;
				}
			});
		},
		logout: function(){
			sessionService.destroy('user');
			$location.path('/');
		},
		islogged: function(){
			var checkSession = $http.post('session.php');
			return checkSession;
		},
		fetchuser: function(){
			var user = $http.get('fetch.php');
			return user;
		}
	}
});