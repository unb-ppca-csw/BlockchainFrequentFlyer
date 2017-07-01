# Uma implementação do uso da Blockchain /  BlockchainFrequetFlyer


## Matéria de Construção de Software - UnB - Junho/Julho - 2017

A ideia é fazer uma implementação para usar as vantagens da estrutura do Blockchain na contagem de pontos dos cartões de crédito e/ou milhagem para uso de troca de itens e voos aereos.

Os administradores (os bancos) utilizam o controle de contagem de pontos/milhagem usando um banco de dados central e demandando uma estrutura central de banco de dados e sua eventual replicação.

A ideia é a substituição desta tecnologia por algo mais rápido, seguro e econômico.

O uso de blockchain trás as seguintes vantagens perante o modelo neste momento em utilização:

1. **Tamanho do banco de dados distribuido**: os bancos de dados usados são grandes e com muitas informações para serem usadas afim de conseguir um nível aceitável de confiança nas transações. A implementação do blockchain irá diminuir em várias vezes menos o tamanho do bando de dados necessário para controlar e garantir a confiança dos usuários e de seus donos.

2. **Rapidez**: o tempo usado para o processamento das transações é mais rápido que o que hoje os banco usam. Talvez por ser menor o banco de dados, pelas transações terem apenas duas partes (sem o terceiro de confiança), ou por ter o processamento descentralizado, a efetivação e processamento global das transações são mais rápidas.

3. **Segurança**: com o modelo de banco de dados distribuído com o uso de chaves públicas e privadas a segurança é garantida a um nível muito alto. O esforço computacional para se conseguir burlar o mecanismo de segurança torna inviável a falsificação e com a descentralização e o uso da blockchain a segurança tende a aumentar o nível de segurança.


## Sobre a Implementação

Foi realizada a implementação que realiza o controle da pontuação ou das milhares de cada cliente. 
Assumiremos que existe um banco físico (real) que possui vários clientes e possui vários clientes com cartões de crédito e com programas de milhas/pontos em seus cartões.

Cada usuário possuirá uma carteira que inicialmente não conterá nada e uma carteira do banco onde teremos todos os pontos/créditos/milhagem.

Serão realizadas as ações necessárias para que essas carteiras reflitam o estado atual de créditos disponíveis.


## Sobre o problema

Hoje os bancos possuem cartes de créditos e nestes seus programas de milhagem e vantagens.
O problema na estrutura atual é a centralização, demandando grande processamento e muito investimento em infraestrutura de rede, de máquinas para processamento e um sistema complexo para dar conta de tantas requisições e 24horas.


## Solução Proposta

Utilizar a arquitetura já bastante testada do blockchain para substituir e atualizar, acrescentando novas funcionalidades ao controle dos pontos, milhagens e vantagens dos clientes dos cartões de crédito.


## O que foi implementado?

Uma versão do blockchain no ar, com um esquema para testar o acesso à blockchain privada.
Os nós presentes na rede poderão acessar suas carteias e verificar o que possuem. Os créditos podem ser enviados da carteira Pai para as carteiras filhas (filho1 e filho);
A instituição, o banco (pais), é a única que poderá criar as milhas e distruibui-los para as carteiras de seus clientes.


## Softwares necessários

Foram usados os seguintes softwares para o desenvolvimento da solução:

1. Sistema Operacional: Ubuntu 17.04 Desktop atualizado com todas as atualizações at o dia 20/6/2017;
2. Implementação do Blockchain: Multichain (https://github.com/MultiChain/multichain) em sua versão 1.0 beta 2 para o Linux;
3. Biblioteca para Desenvolvimento: Node.js (https://nodejs.org) em sua versão 8.1.2
4. Instalar as bibliotecas necessárias para a compilação pelo node, usando o NPM para isso

## Para colocar para funcionar

Comece instalando o Ubuntu 17.04 em uma máquina virtual, pode se usado qualquer um dos virtualizadores mais usados atualmente.
Sugiro o uso do VirtualBox ou o VMWare. Pode ser usada uma máquina real, mas uma VM é mais seguro para 
Atualize o SO usando os comandos: 
```sh
sudo apt-get update upgrade
```
Reinicie

Após reiniciar, vá ao terminal e baixe o multichain: 
```sh
wget http://www.multichain.com/download/multichain-1.0-beta-2.tar.gz
```
Siga os passos para instalar e multichain: `http://www.multichain.com/download-install/`

Para baixar o node.js: 
```sh
wget https://nodejs.org/dist/v8.1.2/node-v8.1.2-linux-x64.tar.xz
```
Baixe e instale o Node.js. Uma sugestão de passo-a-passo para o Node.js: `https://www.digitalocean.com/community/tutorials/como-instalar-o-node-js-no-ubuntu-16-04-pt`

Depois que tudo estiver baixado e funcionando, vamos à configuração desta implementação efetivamente:

# 1a. parte - Servidor Multichain
1. Vá em qualquer diretório e digite
```sh
multichain-util 
```
para verificar este está funcionando
2. Digite 
```sh
multichain-util create FrequentFlyerProgram
```
3. Vá até o arquivo 
```sh
~/.multichain/FrequentFlyerProgram/multichain.conf
``` 
e copie as informações: `rpcuser` e `rpcuser` e acrescente as seguintes linhas:
```sh
rcpallowip=<coloque aqui o IP da máquina que irá acessar>
rcpallowip=127.0.0.1
```
4. Vá até o arquivo 
```sh
~/.multichain/FrequentFlyerProgram/param.dat 
```
e procure por `default-rpc-port` e anote esse número também
5. Execute o seguinte comando para inciar o Multichain: 
```sh
multichaind FrequentFlyerProgram -daemon
```

# 2a. parte - Server HTTP Angular
1. Crie um diretório para a FrequentFlyerProgram diferente do usado para a multichain
2. Entre no diretório e baixe o projeto, por exemplo, usando: 
```sh
git clone https://github.com/haroldomendes/BlockchainFrequentFlyer
```
3. Entre no diretório criado (BlockchainFrequenteFlyer) e digite: 
```sh
npm install
```
4. Edite o arquivo 
```sh
./routes/acoes.js 
```
e atualize as 3 primeiras linhas com as informações coletadas na 1a parte

5. No diretório raiz do projeto digite: 
```sh

node init.js

```

## Utilização / Teste

```sh
AVISO: AVISO: AVISO: AVISO: AVISO: AVISO: AVISO: AVISO: AVISO: AVISO: 

Pela natureza ASSÍNCRONA do Angular, é possível que a sequência
abaixo não ocorra nesta ordem ideal. Talvez seja necessário reiniciar
o servidor 2, 3 ou 4 vezes até que tudo  esteja carregado e objetos 
corretamente criados na Blockchain.

AVISO: AVISO: AVISO: AVISO: AVISO: AVISO: AVISO: AVISO: AVISO: AVISO: 
```

O processo de carga irá criar um servidor de aplicação que estará ouvindo na porta 8080 e irá realizar as seguintes ações na blockchain:
1. Teste de conexão com a blockchain (se os dados estiverem corredos no arquivo ./routes/acoes.js e não houver nenhum impedimento nas regras da rede, o teste irá concluir com sucesso)
2. Procura por 3 carteiras válidas, se não encontrar, serão criadas - Carteiras Pai, Filho1 e Filho2
3. Carrega as informações de créditos de cada carteira
4. Procura pelo ativo MILHA na blockchain, caso não acha, será criada com 100.000 de crédito e a atribui para a carteira Pai
5. Dá direito para receber e enviar às carteiras Filho 1 e Filho 2
6. Teste a transferência de ativos realizando:

   6.1. Transfere 100 milhas para Filho 1
   
   6.2. Transfere 200 milhas para Filho 2

Após o processo de carga vá até um navegador da internet e tente acessa o endereço `http://endereço-da-máquina:8080` e deverá aparecer uma tela com as informações das 3 carteiras separadas por abas.
Na aba da carteira pai irá aparecer um botão para transferência de recursos aleatórios para as carterias Filho 1 e Filho 2, também aleatoriamente. Pressionando o botão para a transferência, é possível verificar os créditos sendo retirados da Carteia Pai e creditados às carteiras Filhos atualizando a página e mudando de abas.

Todas as informações de pesquisa na blockchain, de escrita, dos valores das transações, das pesquisas realizadas são mostradas com mais detalhes na console do servidor http carregado pelo node.js.

