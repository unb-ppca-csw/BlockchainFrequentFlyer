module.exports = function (app) {
  
    app.get('/acoes/carregaCarteiras', function (req, res) {
    
    });
 
    app.get('*', function (req, res) {
        res.sendFile(__dirname + './private/index.html');
    });    
};

//function carregaDadosCarteiras(req, res) {
//	acoes.listAddresses(acoes.multichain, function (res) {
//		acoes.carregaCarteira(acoes.multichain,res[0],function (r0) {
//			pai = '{ "pai":'+r0+'}';
//			acoes.carregaCarteira(acoes.multichain,res[1],function (r1) {
//				filho1 = '{ "filho1:'+r1+'}';
//				acoes.carregaCarteira(acoes.multichain,res[2],function (r2) {
//					filho2 = '{ "filho2:'+r2+'}';
//					texto = '{ "carteiras": {'+pai+','+filho1+','+filho2+'}}';
//					res.json(JSON.parse(texto));
//				});
//			});
//		});
//	});
//};
