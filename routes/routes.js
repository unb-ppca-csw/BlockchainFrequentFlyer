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
		var destino = Math.floor((Math.random()*2)+1);
		var qtd = Math.floor((Math.random()*2)+1) * 100;
		
//		var milha = req.body.milha;
//		var cart = req.body.carteiras;
//		
//		console.log(milha);
//		console.log(cart);
		
//		var destino = req.body.milha.destino;
//		var qtd = req.body.milha.qtd;
		
		acoes.transfereValores(resp[0], resp[destino], qtd);
		console.log("AVISO: Está sendo transferindo "+qtd+" para o Filho "+destino+" ["+resp[destino]+"]");
	});
};

