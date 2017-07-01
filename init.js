var http = require('http');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var acoes = require("./routes/acoes");

var app = express(); 
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/private')); 		// set the static files location /private/img will be /img for users
app.use(morgan('dev')); 								// log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); 	// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 							// parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); 		// override with the X-HTTP-Method-Override header in the request

require('./routes/routes')(app);

app.listen(port);

console.log("Servidor carregado com o node.js");
console.log("Configurando a blockchain");
console.log("Usando a porta "+port);

acoes.getInfo(function (res) {
	if (!res) {
		
		console.log("\nHouve algum erro na conexão. Favor rever o usuário, a senha e o número da porta e tente realizar o teste novamente");
		
	} else {
		console.log(res);
		acoes.listAddresses(function (res) {
			if (res.length <3) {
				acoes.getNewAddress(function (add1) {});
				acoes.getNewAddress(function (add2) {});
				acoes.getNewAddress(function (add3) {});
			}
		});
		
		acoes.listAddresses(function (res) {
			pai = res[0];
			filho1 = res[1];
			filho2 = res[2];
						
			acoes.existeAsset("MILHA", function (existe) {
				if (existe) {
					console.log("Moeda MILHA já existe. Não há necessidade de criar novos ativos");
				} else {
					acoes.createAsset("MILHA", pai, 100000, function (resAsset) {
						console.log("Moeda MILHA criada com 100.000 milhas no endereço pai ["+pai+"]");
					});
				};
			});
			
			console.log("Dando direito ao "+filho1+" para receber e enviar MILHAS.");
			acoes.grant(filho1);
			
			console.log("Dando direito ao "+filho2+" para receber e enviar MILHAS.");
			acoes.grant(filho2);
			
			console.log("Transferindo 100 MILHAS de "+pai+" para o "+filho1);
			acoes.transfereValores(pai, filho1, 100);
			
			console.log("Transferindo 200 MILHAS de "+pai+" para o "+filho2);
			acoes.transfereValores(pai, filho2, 200);

			
			acoes.carregaMilhasCarteira(pai, function (valor) {
				console.log (" Carteira Pai ["+pai+"] possui "+valor+" milhas.");
				acoes.carregaMilhasCarteira(filho1, function (valor) {
					console.log (" Carteira Filho 1 ["+filho1+"] possui "+valor+" milhas.");
					acoes.carregaMilhasCarteira(filho2, function (valor) {
						console.log (" Carteira Filho 2 ["+filho2+"] possui "+valor+" milhas.");
					});
				});
			});

			console.log("AVISO: Carga dos dados podem ser realizados na ordem incorreta por causa do Angular Assincronizado");
		}); 
	}
});
