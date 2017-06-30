angular.module('app', ['components'])
 
.controller('carteiraPai', function($scope) {
	$scope.$on('dados', function (e, carteiras) {
		$scope.carteiraPai = carteiras.pai;	
	})
})

.controller('carteiraFilho1', function($scope) {
	$scope.$on('dados', function (e, carteiras) {
		$scope.carteiraFilho1 = carteiras.filho1;	
	})
})

.controller('carteiraFilho2', function($scope) {
	$scope.$on('dados', function (e, carteiras) {
		$scope.carteiraFilho2 = carteiras.filho2;	
	})
})

.controller('carregaCarteiras', ['$rootScope', '$scope','$http','Acoes', function($rootScope, $scope, $http, Acoes) {
	// Valores Iniciais
	$scope.carteiras = [
		{valor : 1, nome:"Carteira Filho 1"},
		{valor : 2, nome:"Carteira Filho 2"}
	];
	$scope.master = {};
	
	// Definição das Funções/Ações
	$scope.enviaMilhas = function(milha) {
		Acoes.enviaMilhas();
		window.alert('Milhas enviadas!');
		Acoes.get().then(function (response) {
			// success
			$rootScope.$broadcast('dados', response.data.carteiras);		
		}, function (response) {
			// error
			window.alert("error="+response.data);
		});
	}
	
	$scope.initReset = function(milha) {
		$scope.master = angular.copy(milha);
	}
	
	$scope.reset = function() {
		$scope.milha = angular.copy($scope.master);
	}
	
	// Ações Iniciais
    // Atualiza os valores das carteiras na primeira vez que o software for carregado
	Acoes.get().then(function (response) {
		// success
		$rootScope.$broadcast('dados', response.data.carteiras);		
	}, function (response) {
		// error
		window.alert("error="+response.data);
	}); 

	$scope.initReset();
	
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
