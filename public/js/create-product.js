//const app = angular.module('online-store-app', []);

app.controller('createProductController', function ($scope, $http, AdminService, SessionService) {
    $scope.products = [];
    $scope.administrador = false;
    $scope.name = '';
    $scope.description = '';
    $scope.price = 0;
    $scope.imageUrl = '';


    $scope.getProducts = async () => {
        const token = localStorage.getItem('token');
        $http.get('http://localhost:3131/api/products', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            $scope.products = response.data;
            console.log($scope.products);
        });
    }
    $scope.getProducts();

    $scope.createProduct = () => {
        $http.post('http://localhost:3333/api/products', {
            name: $scope.name,
            price: Number($scope.price.replace(/\D/g, '')) / 100,
            description: $scope.description,
            imageUrl: $scope.imageUrl,
        }, {
            headers: {
                Authorization: `Bearer ${SessionService.getToken()}`
            }
        }).then(() => {
            location.href = "/home.html";
        })
    }

    SessionService.verifyLogin();
    SessionService.createVerifyLoginInterval();
    $scope.logout = SessionService.logout;
    AdminService.verifyAdmin();
});