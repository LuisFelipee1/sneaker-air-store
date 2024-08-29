const app = angular.module('online-store-app', []);

app.controller('registerController', function ($scope, $http) {
    $scope.cart = [];
    $scope.userEmail = '';
    $scope.userName = '';
    $scope.userPassword = '';
    $scope.confirmationPassword = '';
    $scope.confirmation = false;
    $scope.userList = [];
    $scope.loading = false;

    $scope.addUser = () => {
        if(!$scope.userName) {
            return alert('Insira um nome');
        }
        if ($scope.confirmationPassword !== $scope.userPassword) {
            $scope.confirmation = true;
        }
        $http.post('http://localhost:1030/api/users', {
            name: $scope.userName,
            email: $scope.userEmail,
            password: $scope.userPassword,
        })
            .then(() => {
                $scope.loadUser();
                localStorage.setItem('name', $scope.userName);
                location.href = './login.html';
            }, () => {
                $scope.loading = true
            });
    }

    $scope.loadUser = async () => {
        const { data } = await $http.get('http://localhost:1030/api/users', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        $scope.userList = data;
        console.log(`usuários:${$scope.userList}`);
        $scope.$apply();
    }
    $scope.loadUser();

    $scope.verifyLogin = () => {
        const token = localStorage.getItem('token');
        if (token) {
            location.href = './login.html';
        }
    }
    $scope.verifyLogin();
});