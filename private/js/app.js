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
	$scope.master = {};
//	$scope.wallets = {};
	
	// Definição das Funções/Ações
	$scope.enviaMilhas = function(milha) {
		Acoes.enviaMilhas();
//		window.alert('Milhas enviadas!');
	}
	
	$scope.initReset = function(milha) {
		$scope.master = angular.copy(milha);
	}
	
	$scope.reset = function() {
		$scope.milha = angular.copy($scope.master);
	}
	
	// Ações Iniciais
	Acoes.get(); // Atualiza os valores das carteiras na primeira vez que o software for carregado
//	Acoes.get()
//		.success(function (data) {
//			$scope.wallets = data;
//			$scope.loading = false;
//		});
	$scope.initReset();
	
}])

.factory('Acoes', ['$http',function($http) {
	return {
		get : function() {
			return $http.get('/acoes/carregaCarteiras')
		},
	
		enviaMilhas: function () {
			return $http.get('/acoes/enviaMilhas');
		}
	}
}])
