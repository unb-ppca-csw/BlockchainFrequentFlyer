var acoes = require("../js/acoes");

module.exports = function (app) {
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/private/index.html');
    });
    
    app.get('/api/documentos', function (req, res) {
        //getTodos(req, res);
    });
    
    app.post('/api/entrada', function (req, res) {
    	carregaDadosCarteiras(req, res);
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

function carregaDadosCarteiras(req, res) {
	acoes.listAddresses(acoes.multichain, function (res) {
		acoes.carregaCarteira(acoes.multichain,res[0],function (r0) {
			pai = '{ "pai":'+r0+'}';
			acoes.carregaCarteira(acoes.multichain,res[1],function (r1) {
				filho1 = '{ "filho1:'+r1+'}';
				acoes.carregaCarteira(acoes.multichain,res[2],function (r2) {
					filho2 = '{ "filho2:'+r2+'}';
					texto = '{ "carteiras": {'+pai+','+filho1+','+filho2+'}}';
					res.json(JSON.parse(texto));
				});
			});
		});
	};
}
