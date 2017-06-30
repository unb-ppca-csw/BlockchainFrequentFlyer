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
	// Valores Iniciais
	$scope.carteiras = [
		{valor : 1, nome:"Carteira Filho 1"},
		{valor : 2, nome:"Carteira Filho 2"}
	];	
	$scope.carteiraPaiNova = 4000000;
	
	// Definição das Funções/Ações
	$scope.enviaMilhas = function() {
		Acoes.enviaMilhas();
		Acoes.get();
	}
	
	// Ações Iniciais
	Acoes.get(); // Atualiza os valores das carteiras na primeira vez que o software for carregado
}])

.factory('Acoes', ['$http',function($http) {
	return {
		get : function() {
			return $http.get('/acoes/carregaCarteiras');
		},
	
		enviaMilhas: function () {
			return $http.get('/acoes/enviaMilhas');
//			return $http({
//				method: 'GET',
//				url: '/acoes/enviaMilhas',
//				params: 'qtd='+qtd+',destino='+destino
//			});
		}
	}
}])
