//const app = angular.module('online-store-app', []);

app.controller('createProductController', function ($scope, $http, AdminService, SessionService) {
    $scope.name = "";
    $scope.price = "R$ 0,00";
    $scope.description = "";
    $scope.imageUrl = "";

    $scope.formatPrice = () => {
        const price = Number($scope.price.replace(/\D/g, '')).toString()
        const priceStr = price.padStart(3, '0')
        const priceArr = priceStr.split('')
        priceArr.splice(priceArr.length - 2, 0, ',')
        $scope.price = 'R$ ' + priceArr.join('');
    }

    $scope.createProduct = () => {
        $http.post('http://localhost:3131/api/products', {
            name: $scope.name,
            price: Number($scope.price),
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
});