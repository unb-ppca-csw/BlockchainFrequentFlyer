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

.controller('carregaCarteiras', ['$scope','$http','Acoes', function($scope, $http, Acoes) {
//	$scope.carteiras = {
//		'pai': 0,
//		'filho1' :0,
//		'filho2' :0
//	};
//	
//	$scope.enviaMilhas = {
//		'qtd':0,
//		'destino':1
//	};
	
	$scope.carteiras = [
		{valor : 1, nome:"Carteira Filho 1"},
		{valor : 2, nome:"Carteira Filho 2"}
	];
	
	$scope.carteiraPaiNova = 4000000;
	
	$scope.enviaMilhas = function() {
		Acoes.enviaMilhas();
	}
	
	Acoes.get();
}])

.factory('Acoes', ['$http',function($http) {
	return {
		get : function() {
			return $http.get('/acoes/carregaCarteiras');
		},
	
		enviaMilhas: function () {
			return $http.get('/acoes/enviaMilhas');
		}
	}
}])
