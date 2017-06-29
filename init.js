var http = require('http');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var acoes = require("./private/js/acoes.js");

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

app.listen(port);

console.log("Servidor carregado com o node.js");
console.log("Configurando a blockchain");
console.log("Usando a porta "+port);
console.log("\nA multichain está com essa configuração:");
console.log(multichain);

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

require('./private/routes/routes.js')(app);

function listIssue(multichain, callback) {
	multichain.listPermissions({
		permissions: "issue"
	}, (err, res) => {
		if (err) { 
			console.log (err);
			return;
		}
		else {
			console.log(res);
			return callback(res[0].address);
		}
	});
};

function listAddresses(multichain, callback) {
	multichain.getAddresses( (err, addrs) => {
		if (err) { console.log (err); }
		else {
			return callback(addrs);
		};
	});
} ;

function createAsset(multichain, nome, endereco, quantidade) {
	criaMoeda = {
			asset: nome,
			address: endereco,
			open: true,
			qty: quantidade,
			units: 0.1
	};
	multichain.issue(criaMoeda, (err,res) => {
		if (res) { console.log(res); };
		if (err) { console.log (err); };
	});
};

function grant(multichain, addr) {
	grants = {
			addresses: addr,
			permissions: "receive,send"
	};
	multichain.grant(grants, (err,res) => {
		if (res) { console.log(res); };
		if (err) { console.log (err); };
	});
};

/**
 * Tranfere valores do addr1 para addr2
 */
function transfereValores(multichain, addr1, addr2, valor) {
	// params: '{"name":"milhas","open":true}',
	transferencia = {
			from: addr1,
			to: addr2,
			asset: "MILHA",
			qty: valor
//			'{"addr2": {"MILHA":valor}}',
//			params: '{"'+addr2+'":{"MILHA":'+valor+'}}',
//			action: "send"
	};
	multichain.sendAssetFrom(transferencia, (err,res) => {
		if (res) { console.log("Transferência realizada = "+res); };
		if (err) { 
			console.log (err);
			console.log("Transferencia=");
			console.log(transferencia);
		};
	});
};

