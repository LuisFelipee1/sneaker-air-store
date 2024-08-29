const app = angular.module('online-store-app', []);

app.controller('loginController', function ($scope, $http) {
    $scope.email = "";
    $scope.password = "";
    $scope.loading = false;
    $scope.loginErroe = false;

    $scope.handleSubmit = () => {
        $scope.loading = true;
        $http.post('http://localhost:3131/api/session', {
            email: $scope.email,
            password: $scope.password,
        })
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', $scope.email);
                location.href = './home.html';
            }, () => {
                $scope.loading = false;
                $scope.loginErroe = true;
            });
    }

    $scope.verifyLogin = () => {
        const token = localStorage.getItem('token');
        if (token) {
            location.href = './home.html';
        }
    }
    $scope.verifyLogin();
});