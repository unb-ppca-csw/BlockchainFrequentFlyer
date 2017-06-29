angular.module('app', ['components'])
 
.controller('carteiraPai', function($scope) {
	$scope.carteiraPai = 1000000;
})

.controller('carteiraFilho1', function($scope) {
	$scope.carteiraFilho1 = 2000;
})

.controller('carteiraFilho2', function($scope) {
	$scope.carteiraFilho2 = 3000;
})