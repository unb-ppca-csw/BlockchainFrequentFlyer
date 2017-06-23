
var multichain = require("multichain-node") ({
	host: '127.0.0.1',
	port: 9730,
	user: "multichainrpc",
	pass: "31UBBdADMv5GULtaivU1v4bGwJ7kdfPkFmXJ1Scugmoc"
});

multichain.getInfo((err, info) => {
	if (err) {
		console.log("Erro ao tentar getInfo");
		console.log(err);
	} else {
		console.log("Funfou coneção");
		console.log(info);	
	}		
	
});
