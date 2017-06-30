/** 
 * Apenas configure essas 3 variáveis 
 * */
var usuario = "multichainrpc";
var senha = "31UBBdADMv5GULtaivU1v4bGwJ7kdfPkFmXJ1Scugmoc";
var porta = 9730;










var addr = "";
require('dns').lookup(require('os').hostname(), function (err, addr, fam) {
	// Recupera o endereço IP da estação que está rodando o servidor
	// O blockchain e o servidor node.js devem estar na mesma máquina
});

// Cria a conexão com a blockchain
var multichain = require("multichain-node") ({
	host: addr,
	port: porta,
	user: usuario,
	pass: senha
});

exports.getInfo = function(callback) {
	multichain.getInfo((err, info) => {
		if (err) {
			console.log(err);
			return;
		} 
		return callback(info);
	});
};

exports.listAddresses = function(callback) {
	multichain.getAddresses( (err, addrs) => {
		if (err) { console.log (err); }
		else {
			return callback(addrs);
		};
	});
};

exports.createAsset = function(nome, endereco, quantidade) {
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

exports.existeAsset = function (ativo, callback) {
	lista = {
			asset: ativo
	};
	multichain.listAssets(lista, (err,res) => {
		if (err) { 
			console.log(err); 
			return; 
		};
		if (res) {
			console.log("Fazendo pesquisa do ativo "+ativo+" na blockchain...");
			for (i=0; i<res.length;i++) {
				if (res[i].name == ativo) {
					console.log("Ativo "+ativo+" encontrado");
					return callback(true);
				}
			}
		}
		console.log("Ativo "+ativo+" não foi encontrado");
		return callback(false);
	});
};

exports.grant = function (addr) {
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
exports.transfereValores = function (addr1, addr2, valor) {
	transferencia = {
			from: addr1,
			to: addr2,
			asset: "MILHA",
			qty: valor
	};
	multichain.sendAssetFrom(transferencia, (err,res) => {
		if (res) { console.log("Transferência realizada = "+res); };
		if (err) { 
			console.log(err);
			console.log("Transferencia=");
			console.log(transferencia);
		};
	});
};

exports.carregaMilhasCarteira = function (addr, callback) {
	console.log("carregaMilhasCarteira de "+addr);
	balanco = {
			address: addr
	};
	multichain.getAddressBalances(balanco, (err, res) =>{
		if (err) {
			console.log("Erro ao buscar balanço de "+addr);
			console.log(err); 
			return; 
		}
		console.log(res);
		if (res instanceof Array)
			for (i=0; i<res.length;i++)
				if (res[i].name == "MILHA")
					return callback(res[i].qty);
		return callback(res.qty);		
	});
}

	