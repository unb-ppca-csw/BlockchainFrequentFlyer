var http = require('http');

/* 
 * Cria a conexão e verifica se as configurações iniciais existem na blockchain
 * se existir, não faz nada, e caso não exista, cria as configurações
 */

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

multichain.getInfo((err, info) => {
	if (err) {
		console.log(err);
		console.log("\nHouve algum erro na conexão. Favor rever o usuário, a senha e o número da porta e tente realizar o teste novamente");
	} else {
		listPermissionsIssue(multichain, function (res) {
			pai = res[0];
			filho1 = res[1];
			filho2 = res[2];
			
//			createAsset(multichain, "MILHA", pai, 100000, function (resAsset){
//				console.log("Moeda MILHA criada com 100.000 milhas no endereço pai ["+pai+"]");
//			});
			
//			grant(multichain, filho1, filho2);
//			transfereValores(multichain, pai, filho1, 100);
			transfereValores(multichain, pai, filho2, 200);
			
		}); 
	}
});


// Lista de Endereços
//multichain.getAddresses( (err,enderecos) => {
//	for (i=0; i < enderecos.length; i++) {
//		console.log(i+":"+enderecos[i]);
//	}
//	
//	listPermissions(multichain, function(res) { console.log("listPermissions="+res); } );
//
//});
//


// Verifica a configuração padrão existe na blockchain em questão
//const qtdWallets = 3;
//var carteiraBrb, wallets = [], grant1, grant2;
//
//multichain.getAddresses((err,wallets) => {
//	//console.log(wallets);
//	var tam = wallets.length; 
//	if ( tam > (qtdWallets-1) ) {
//		console.log("1. Já existem "+tam+" carteiras registradas [OK]");
//		console.log(wallets);
//	} else {
//		console.log("1. Será necessário crias "+(3-tam)+" novas carteiras, pois existem apenas "+tam+" carteira");
//		for (i = tam-1; i < qtdWallets; i++) {
//			multichain.getNewAddress((err, address) => {
//				wallets[i] = address;
//				//console.log(wallets[i]);
//				if (err) {
//					console.log(err);
//				}
//			});
//		}
//	}
//	
//	carteiraBrb = {
//			address: wallets[0],
//			asset: "milhas",
//			qty: 1000000,
//			units: 0.00001,
//			details: { brb: "Depositando 1 milhão de milhas na Entidade Padrão"}
//	};
//	
//	grant1 = {
//			address: wallets[1],
//			permissions: "send,receive"
//	};
//	
//	grant2 = {
//			address: wallets[2],
//			permissions: "send,receive"
//	};
//	
//});

//multichain.issue( carteiraBrb, (err, res) => {
//	//console.log("wallet[0]=["+wallets[0]+"]");
//	if (res) { console.log(res); };
//	if (err) { console.log (err); };
//	
//	
//});

//// dar direito a todas as 3 carteiras
//multichain.grant(grant1, (err,res) => {
//	console.log(grant1);
//	console.log(grant2);
//	if (res) { console.log(res); };
//	if (err) { console.log (err); };
//});


//multichain.getAddresses((err,wallets) => {
//	if (err) { console.log (err); }
//	else {
//		multichain.sendAssetFrom ( {
//			from: wallets[0],
//			to: wallets[1],
//			asset: "milhas",
//			qty: 1000
//		}, (err,res) => {
//			if (res) { console.log(res); };
//			if (err) { console.log (err); };
//		});	
//		
//		multichain.sendAsset( {
//			address: wallets[1],
//			asset: "milhas",
//			qty: 1000
//		}, (err,res) => {
//			if (res) { console.log(res); };
//			if (err) { console.log (err); };
//		});
//		
//	};
//});

//multichain.getAddresses((err,wallets) => {
//	if (err) { console.log (err); }
//	else {
//		primeiroCredito = {
//				from: wallets[1],
//				to: wallets[1],
//				params: '{"name":"milhas","open":true}',
//				qty: 15000
//			//	'{"origin":"br", "estagio":"01", "motivo":"preenchimento carteira"}'
//		};
//				
//		multichain.issueFrom(primeiroCredito, (err,res) => {
//			if (res) { console.log(res); };
//			if (err) { console.log (err); };
//		});	
//	};
	
//	transfereParaOutro = {
//			from: wallets[0],
//			to: wallets[1],
//			asset: "milhas",
//			qty: 25000
//	};
//	
//	multichain.issueMoreFrom(transfereParaOutro, (err, res)=> {
//		if (res) { console.log(res); };
//		if (err) { console.log (err); };
//	});	
	
//});




function listPermissionsIssue(multichain, callback) {
	multichain.listPermissions({
		permissions: "issue"
	}, (err, res) => {
		if (err) { 
			console.log (err);
			return;
		}
		else {
			console.log(res);
			addresses = [];
			for (i=0; i<res.length;i++) {
				addresses[i] = res[i].address;
			};
			return callback(addresses);
		}
	});
};

function createAsset(multichain, nome, endereco, quantidade, callback) {
	criaMoeda = {
			name: nome,
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

function grant(multichain, addr1, addr2) {
	grants = {
			addresses: addr1 +","+ addr2,
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
	transferencia = {
			from: addr1,
			{ addr2 : valor},
			action: "send"
	};
	multichain.createRawSendFrom(transferencia, (err,res) => {
		if (res) { console.log(res); };
		if (err) { console.log (err); };
	});
};

