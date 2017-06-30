var acoes = require("../routes/acoes.js");

module.exports = function (app) {
	
    app.get('/acoes/carregaCarteiras', function (req, res) {
    	carregaDadosCarteiras(req,res);
    });
    
    app.get('/acoes/enviaMilhas', function (req, res) {
    	enviaMilhas(req,res);
    });
 
    app.get('*', function (req, res) {
        res.sendFile(__dirname + './private/index.html');
    });    
};

function carregaDadosCarteiras(req, res) {
	var texto, resposta;
	acoes.listAddresses(function (resp) {
		console.log(resp);
		acoes.carregaMilhasCarteira(resp[0],function (r0) {
			pai = '"pai":'+r0;
			acoes.carregaMilhasCarteira(resp[1],function (r1) {
				filho1 = '"filho1":'+r1;
				acoes.carregaMilhasCarteira(resp[2],function (r2) {
					filho2 = '"filho2":'+r2;
					
					texto = '{"carteiras": {'+pai+','+filho1+','+filho2+'}}';
					console.log(texto);
					
					resposta = JSON.parse(texto);
					res.json(resposta);
				});
			});
		});
	});
};

function enviaMilhas(req,res) {
	acoes.listAddresses(function (resp) {
		var destino = "1MnqdszwSnKxgCMyBN33eifgLRqrD5YnotwNoo";
		var qtd = 100;
//		var destino = body.milha.destino;
//		var qtd = body.milha.qtd;
		
		acoes.transfereValores(resp[0], destino, qtd);
		console.log("AVISO: Está sempre transferindo 100 para o Filho 2="+destino);
	});
};

