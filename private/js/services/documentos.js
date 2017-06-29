angular.module('protoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Docs', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/documentos');
			},
			load : function(todoData) {
				return $http.post('/api/entrada', todoData);
			},
			create : function(todoData) {
				return $http.post('/api/documentos', todoData);
			}
		}
	}]);