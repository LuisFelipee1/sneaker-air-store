//const app = angular.module('online-store-app', []);

app.controller('createProductController', function ($scope, $http, AdminService) {
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
        const token = localStorage.getItem('token');
        const productData = {
            name: $scope.name,
            description: $scope.description,
            price: $scope.price,
            imageUrl: $scope.imageUrl
        };
        $http.post('http://localhost:3131/api/products', productData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data);
            $scope.products.push(productData);
            $scope.getProducts();
            location.href = './home.html';
        })
    }

    AdminService.verifyAdmin();
});