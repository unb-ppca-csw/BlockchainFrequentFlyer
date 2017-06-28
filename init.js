var http = require('http');

const connection = {
		host: addr,
		port: 9730,
		user: "multichainrpc",
		pass: "31UBBdADMv5GULtaivU1v4bGwJ7kdfPkFmXJ1Scugmoc"
}
/* 
 * Cria a conexão e verifica se as configurações iniciais existem na blockchain
 * se existir, não faz nada, e caso não exista, cria as configurações
 */

var addr = "";

require('dns').lookup(require('os').hostname(), function (err, addr, fam) {
	// Recupera o endereço IP da estação que está rodando o servidor
	// O blockchain e o servidor node.js devem estar na mesma máquina
})

// Cria a conexão com a blockchain
var multichain = require("multichain-node") ({
	host: addr,
	port: 9730,
	user: "multichainrpc",
	pass: "31UBBdADMv5GULtaivU1v4bGwJ7kdfPkFmXJ1Scugmoc"
});

// Testa se a conexão está funcionando
multichain.getInfo((err, info) => {
	if (err) {
		console.log(err);
		console.log("\nHouve algum erro na conexão. Favor rever o usuário, a senha e o número da porta e tente realizar o teste novamente");
	} 
//	else {
//		console.log(info);
//	}
});

// Verifica a configuração padrão existe na blockchain em questão
const qtdWallets = 3;
var carteiraBrb, wallets = [], grant1, grant2;

multichain.getAddresses((err,wallets) => {
	//console.log(wallets);
	var tam = wallets.length; 
	if ( tam > (qtdWallets-1) ) {
		console.log("1. Já existem "+tam+" carteiras registradas [OK]");
		console.log(wallets);
	} else {
		console.log("1. Será necessário crias "+(3-tam)+" novas carteiras, pois existe apenas "+tam+" carteira");
		for (i = tam-1; i < qtdWallets; i++) {
			multichain.getNewAddress((err, address) => {
				wallets[i] = address;
				//console.log(wallets[i]);
				if (err) {
					console.log(err);
				}
			});
		}
	}
	
	carteiraBrb = {
			address: wallets[0],
			asset: "milhas",
			qty: 1000000,
			units: 0.00001,
			details: { brb: "Depositando 1 milhão de milhas na Entidade Padrão"}
	};
	
	grant1 = {
			address: wallets[1],
			permissions: "connect,send,receive,issue,admin"
	};
	
	grant2 = {
			address: wallets[2],
			permissions: "connect,send,receive,issue,admin"
	};
	
});

multichain.issue( carteiraBrb, (err, res) => {
	//console.log("wallet[0]=["+wallets[0]+"]");
	if (res) { console.log(res); };
	if (err) { console.log (err); };
	
	
});

// dar direito a todas as 3 carteiras
multichain.grant(grant1, (err,res) => {
	console.log(grant1);
	console.log(grant2);
	if (res) { console.log(res); };
	if (err) { console.log (err); };
});








