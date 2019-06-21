var app = angular.module('myApp', ['ui.router','tmodule']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/index.html")     

		$stateProvider

		.state('login', {
			url: '/login',
			templateUrl: 'login.html' 
		})

		.state('home', {
			url: '/home',
			templateUrl: 'home.html' 
		})

		.state('logout', {
			url: '/logout',
			templateUrl: 'logout.php' 
		})

		.state('register',{
			url: '/register',
			templateUrl: 'register.html'   
		})

    }

]);



app.run(function($rootScope, $location, loginService){
	//prevent going to homepage if not loggedin
	var routePermit = ['/home'];
	$rootScope.$on('$routeChangeStart', function(){
		if(routePermit.indexOf($location.path()) !=-1){
			var connected = loginService.islogged();
			connected.then(function(response){
				if(!response.data){
					$location.path('/');
				}
			});
			
		}
	});
	//prevent going back to login page if sessino is set
	var sessionStarted = ['/'];
	$rootScope.$on('$routeChangeStart', function(){
		if(sessionStarted.indexOf($location.path()) !=-1){
			var cantgoback = loginService.islogged();
			cantgoback.then(function(response){
				if(response.data){
					$location.path('/home');
				}
			});
		}
	});
});

app.controller('registerCtrl', ['$scope', '$http', function($scope,$http){
	$scope.errorReg = false;
	$scope.submitRegister = function(){
			//console.log("Rtegus");
					
			$http({
					method:"POST",
					dataType: 'json',
					url: "register.php",
					headers: {
						'Content-Type': 'application/json'
					},
					data: $scope.registerData,
					timeout: 30000,
					cache: false
			})
			.success(function(data){
					// $scope.alertMsg = true;
					// console.log(data);
					if(data.error == true)
					{
						// $scope.alertClass = 'alert-danger';
						// $scope.alertMessage = data.error;
						alert("Failed Registration");
						location.reload();
					}
					else
					{
						// $scope.alertClass = 'alert-success';
						// $scope.alertMessage = data.message;
						$scope.registerData = {};
						alert("Registrationn Successful");
						location.reload();
					}
			 });
			// then(function(response){
			// 				$scope.alertMsg = true;
			// 				$scope.alertClass = 'alert-danger';
			// 				$scope.alertMessage = response.error;
			// 				alert("Failed Registration");
			// 				location.reload();
			// 		}, function (response) {
			// 			  $scope.alertClass = 'alert-success';
			// 				//console.log(data);
			// 				$scope.alertMessage = response.message;
			// 				$scope.registerData = {};
			// 				alert("Registration Successful");
			// 				location.reload();
			// 	});
		}

		// $scope.clearMsg = function(){
		// 	$scope.errorReg = false;
		// }

}]);

app.controller('loginCtrl', function($scope, loginService){
	$scope.errorLogin = false;
	
	$scope.login = function(user){
		loginService.login(user, $scope);
	}

	$scope.clearMsg = function(){
		$scope.errorLogin = false;
	}
});


app.controller('homeCtrl', ['$scope', 'loginService', function($scope, loginService){
	//logout
	$scope.logout = function(){
		loginService.logout();
	}
	
	//fetch login user
	var userrequest = loginService.fetchuser();
	userrequest.then(function(response){
		$scope.user = response.data[0];
		console.log($scope.user)
	});

	
}]);
