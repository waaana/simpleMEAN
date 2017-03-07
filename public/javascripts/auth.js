app.controller('authController',['$scope', '$http', '$location','$rootScope', '$state', ($scope, $http, $location, $rootScope, $state) => {
    $scope.user = {username: '', passwrod: ''};
    $scope.msg = '';

    $scope.signin = () => {
        $http.post('auth/signin', $scope.user)
        .success(response => {
            if(response.state === 'success') {
                $rootScope.authenticated = true;
                $rootScope.current_user = response.user.username;
                $state.go('home');;
            } else {
                $scope.msg = response.msg;
            }
            
        });
    };

    $scope.signup = () => {
         $http.post('auth/signup', $scope.user)
        .success(response => {
            if(response.state === 'success') {
                $rootScope.authenticated = true;
                $rootScope.current_user = response.user.username;
                $state.go('home');;
            } else {
                $scope.msg = response.msg;
            }
            
        });
    }

}]);