var addr = "";

require('dns').lookup(require('os').hostname(), function (err, addr, fam) {
  console.log('addr: '+addr);
})

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
		console.log(info);
		console.log("\nA conexão foi realizada com sucesso.")
	}		
	
});
