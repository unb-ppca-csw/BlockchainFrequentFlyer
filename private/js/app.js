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

.controller('carregaCarteiras', function($scope) {
	console.log("app.js->controller[carregaCarteiras NOVO]");
})

//.controller('carregaCarteiras', ['$scope','$http','acoes', function($scope, $http, acoes) {
//	console.log("app.js->controller[carregaCarteiras]");
////	acoes.get().success(function (data) {
////		console.log("app.js->controller[carregaCarteiras]");
////	})
//}])

.factory('factoryAcoes', ['$http',function($http) {
	return {
		get : function() {
			console.log("factoryAcoes->app.js");
			return $http.get('/acoes/carregaCarteiras');
		}
//	,
//		load : function(todoData) {
//			return $http.post('/api/entrada', todoData);
//		},
//		create : function(todoData) {
//			return $http.post('/api/documentos', todoData);
//		}
	}
}])
