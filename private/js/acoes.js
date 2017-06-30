//var addr = "";
//
//require('dns').lookup(require('os').hostname(), function (err, addr, fam) {
//	// Recupera o endereço IP da estação que está rodando o servidor
//	// O blockchain e o servidor node.js devem estar na mesma máquina
//});
 
//Cria a conexão com a blockchain
//var multichain = require("multichain-node") ({
//	host: addr,
//	port: 9730,
//	user: "multichainrpc",
//	pass: "31UBBdADMv5GULtaivU1v4bGwJ7kdfPkFmXJ1Scugmoc"
//});

//var acoes = angular.module('acoes,[]');
//
//acoes.factory('acoes', function () {
//	return {
//		listAddresses: function () {
//			multichain.getAddrresses((err,addrs) => {
//				if (err) { console.log(err); }
//				else { console.log("Funfou a Fábrica "); }
//			})
//		}
//	};
//});

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

exports.listAddresses = function(multichain, callback) {
	multichain.getAddresses( (err, addrs) => {
		if (err) { console.log (err); }
		else {
			return callback(addrs);
		};
	});
} ;

exports.createAsset = function(multichain, nome, endereco, quantidade) {
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

exports.grant = function (multichain, addr) {
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
exports.transfereValores = function (multichain, addr1, addr2, valor) {
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

function carregaCarteira(multichain, addr, callback) {
	multichain.getAddressBalances({addr}, (err, res) =>{
		for (i=0; i<res.length;i++) {
			if (res[i].name == "MILHA") {
				return callback(res[i].qty);
			}
		}
	});
}