var http = require('http');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var acoes = require("./private/js/acoes");

var app = express(); 
var port = process.env.PORT || 8080;
var addr = "";

require('dns').lookup(require('os').hostname(), function (err, addr, fam) {
	// Recupera o endereço IP da estação que está rodando o servidor
	// O blockchain e o servidor node.js devem estar na mesma máquina
});

// Cria a conexão com a blockchain
var multichain = require("multichain-node") ({
	host: addr,
	port: 9730,
	user: "multichainrpc",
	pass: "31UBBdADMv5GULtaivU1v4bGwJ7kdfPkFmXJ1Scugmoc"
});

app.use(express.static(__dirname + '/private')); 		// set the static files location /private/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

require('./routes/routes')(app);

app.listen(port);

console.log("Servidor carregado com o node.js");
console.log("Configurando a blockchain");
console.log("Usando a porta "+port);

multichain.getInfo((err, info) => {
	if (err) {
		console.log(err);
		console.log("\nHouve algum erro na conexão. Favor rever o usuário, a senha e o número da porta e tente realizar o teste novamente");
	} else {
		acoes.listAddresses(multichain, function (res) {
			pai = res[0];			
			filho1 = res[1];
			filho2 = res[2];
			
			acoes.createAsset(multichain, "MILHA", pai, 100000, function (resAsset){
				console.log("Moeda MILHA criada com 100.000 milhas no endereço pai ["+pai+"]");
			});
			
			acoes.grant(multichain, filho1);
			acoes.grant(multichain, filho2);
			acoes.transfereValores(multichain, pai, filho1, 100);
			acoes.transfereValores(multichain, pai, filho2, 200);
			
		}); 
	}
});




