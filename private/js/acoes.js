function listPermissions(multichain, callback) {
	multichain.listPermissions({
		permissions = issue
	}, (err, res) => {
		if (err) { console.log (err); }
		else { return callback(res) }; 
	});
}

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

function carregaCarteira(multichain, addr, callback) {
	multichain.getAddressBalances({addr}, (err, res) =>{
		for (i=0; i<res.length;i++) {
			if (res[i].name == "MILHA") {
				return callback(res[i].qty);
			}
		}
	});
}