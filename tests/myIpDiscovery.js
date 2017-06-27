var add = "";

require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log('addr: '+add);
})

console.log('O endereço IP que sua máquina ficará visível para a blockchain é '+add);
