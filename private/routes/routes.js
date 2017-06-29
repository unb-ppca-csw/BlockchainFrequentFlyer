module.exports = function (app) {
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/index.html');
    });
    
    app.get('/api/documentos', function (req, res) {
        //getTodos(req, res);
    });
    
    app.post('/api/entrada', function (req, res) {
        getTodos(req, res);
    });
    
    app.post('/api/documentos', function (req, res) {

        var origem = req.body.origem;
        var destino = req.body.destino;

        var documento = new DocumentoFull(
            req.body.nup, req.body.assunto, 
            origem, destino, Date.now());
      
        var strObj = JSON.stringify(documento)
        //console.log('jsonStrObj: ', strObj);
        var strHex = strToHex(strObj);  
        //console.log('strHexobj: ', strHex);

        multichain.sendWithMetadataFrom({from: origem, to: destino, amount: 0.0, data: strHex}, (err, resm) => {
            if(err){
                console.log(err);
            }
            //console.log(resm);
            getTodos(req, res);
        })

    });
}

function carregaCarteiras(multichain,addr, req, res) {
	multichain.getAddressBalances({addr}, (err, res) =>{
		for (i=0; i<res.length;i++) {
			if (res[i].name == "MILHA") {
				
			}
		}
	});
}

var multichain = require("multichain-node") ({
	host: addr,
	port: 9730,
	user: "multichainrpc",
	pass: "31UBBdADMv5GULtaivU1v4bGwJ7kdfPkFmXJ1Scugmoc"
});

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