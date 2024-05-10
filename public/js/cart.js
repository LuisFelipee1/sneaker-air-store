//const app = angular.module('online-store-app', []);

app.controller('cartController', function ($scope, $http) {

    $scope.cart = [];

    $scope.goToCart = async () => {
        const token = localStorage.getItem('token');
        $http.get('http://localhost:3131/api/cart', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            $scope.cart = response.data;
            console.log($scope.cart);
        })
    }
    //$scope.goToCart();

    $scope.removeFromCart = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await $http.delete(`http://localhost:3131/api/cart/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            $scope.cart = response.data;
            $scope.goToCart();
            $scope.getItems();
            alert('Item removido do carrinho com sucesso!');
        } catch (error) {
            console.error('Erro ao remover item do carrinho:', error);
            alert('Ocorreu um erro ao remover o item do carrinho. Por favor, tente novamente mais tarde.');
        }
    }

    $scope.items = [];
    
    $scope.getItems = () => {
        $http.get('http://localhost:3131/api/products')
            .then(response => {
                $scope.items = response.data;
                console.log($scope.items);
            })
            .catch(error => {
                console.error('Erro ao buscar itens:', error);
            });
    }
    $scope.getItems();
});