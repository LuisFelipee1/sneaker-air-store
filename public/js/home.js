//const app = angular.module('online-store-app', []);

app.controller('homeController', function ($scope, $http, AdminService, SessionService) {

    $scope.products = [];
    $scope.users = [];
    $scope.name = '';
    $scope.administrador = false;


    $scope.getProducts = () => {
        $http.get('http://localhost:3131/api/products').then((response) => {
            $scope.products = response.data
        })
    }
    $scope.getProducts();

    $scope.goToCart = () => {
        location.href = './cart.html';
    }

    $scope.getUser = async () => {
        const token = localStorage.getItem('token');
        $http.get('http://localhost:3131/api/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            $scope.users = response.data;
            $scope.users.map((user, index) => {
                if (user.email === localStorage.getItem('email')) {
                    $scope.name = user.name;
                    $scope.administrador = $scope.users[index].admin
                }
            })
        });
    }
    $scope.getUser();

    $scope.logout = () => {
        localStorage.removeItem('token');
        location.href = '/login.html';
    }

    $scope.verifyLogin = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            location.href = './login.html';
        }
    }
    $scope.verifyLogin();

    $scope.createProduct = () => {
        location.href = './create-product.html';
    }

    $scope.nameUpdated = '';
    $scope.descriptionUpdated = '';
    $scope.priceUpdated = 0;
    $scope.imageUpdated = '';

    $scope.editProduct = (id) => {
        localStorage.setItem('id', id);
        location.href = './edit-product.html';
    }


    $scope.updateProduct = () => {
        const id = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        const productUpdated = {
            id: id,
            name: $scope.nameUpdated,
            description: $scope.descriptionUpdated,
            price: $scope.priceUpdated,
            imageUrl: $scope.imageUpdated
        }
        $http.patch(`http://localhost:3131/api/products/${id}`, productUpdated, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            $scope.getProducts();
            alert('Sneaker atualizado com sucesso!');
        })
    }

    $scope.deleteProduct = async (id) => {
        const token = localStorage.getItem('token');
        await $http.delete(`http://localhost:3131/api/products/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            $scope.products.map((product, index) => {
                if (product.id === id) {
                    $scope.products.splice(index, 1);
                }
            })
            $scope.getProducts();
        });
    }

    $scope.products = []

    $scope.getProducts = () => {
        $http.get('http://localhost:3131/api/products').then((response) => {
            $scope.products = response.data;
        })
    }

    $scope.productCart = []

    $scope.addToCart = (productId) => {
        if(!$scope.isAuthenticated) {
            location.href = '/login.html'
            return
        }

        $http.post('http://localhost:3131/api/cart', {
            productId
        }, {
            headers: {
                Authorization: `Bearer ${SessionService.getToken()}`
            }
        }).then((response) => {
            $scope.productCart = response.data
            console.log('productCart: ' + response.data);
            alert('Sneaker adicionado ao carrinho');
        })
    }

    SessionService.verifyLogin(false)
    $scope.logout = SessionService.logout
    $scope.isAuthenticated = SessionService.isAuthenticated()
    $scope.isAdmin = AdminService.isAdmin();
    $scope.getProducts()
    SessionService.createVerifyLoginInterval(()=>{
        SessionService.verifyLogin(false)
        $scope.isAuthenticated = SessionService.isAuthenticated()
        $scope.isAdmin = AdminService.isAdmin();
        $scope.$apply()
    })
    $scope.goToHome = () => {
        location.href = './home.html';
    }

    SessionService.verifyLogin();
});
