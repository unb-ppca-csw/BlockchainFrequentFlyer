angular.module('protoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Docs', function($scope, $http, Docs) {
		$scope.formData = {};
		$scope.carteiras = {};
		//$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Docs.get()
			.success(function(data) {
				//$scope.todos = data;
				$scope.carteiras = data;
				$scope.loading = false;
			});

		// CARREGAR ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.carregar = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.carteiras.pai != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Docs.load($scope.carteiras)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.carteiras = data; // assign our new list of todos
					});
			}
		};

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createCarteiras = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.carteiras.pai != undefined &&
				$scope.carteiras.filho1 != undefined) &&
				$scope.carteiras.filho2 != undefined) {
	
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Docs.create($scope.carteiras)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						//var pai = $scope.carteiras.pai;
						//$scope.carteiras = {}; // clear the form so our user is ready to enter another
						//$scope.carteiras.pai = pai;
						$scope.carteiras = data; // assign our new list of todos
					});
			}
		};
		
		$scope.enviaMilhas = function() {
			if ($scope.carteiras.pai != undefined &&
					$scope.carteiras.filho1 != undefined) &&
					$scope.carteiras.filho2 != undefined) {
		
					$scope.loading = true;

					// call the create function from our service (returns a promise object)
					Docs.create($scope.carteiras)

						// if successful creation, call our get function to get all the new todos
						.success(function(data) {
							$scope.loading = false;
							//var pai = $scope.carteiras.pai;
							//$scope.carteiras = {}; // clear the form so our user is ready to enter another
							//$scope.carteiras.pai = pai;
							$scope.carteiras = data; // assign our new list of todos
						});
				}
			
		};
	}]);