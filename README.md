# Uma implementação do uso da Blockchain 

## Matéria de Construção de Software - UnB - Junho/Julho - 2017

A ideia é fazer uma implementação para usar as vantagens da estrutura do Blockchain na contagem de pontos dos cartões de crédito e/ou milhagem para uso de troca de itens e voos aereos.

Os administradores utilizam o controle de contagem de pontos/milhagem que já existia antes, e que sempre foi usado para este fim, o controle centralizado das transações e o uso de um ponto único para a verificação das transações.

A ideia é a substituição desta tecnologia por algo mais rápido, seguro e mais economico.

O uso de blockchain tras as seguintes vangatens perante ao modelo já estabelecido:

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


## O que será implementado nesta fase Alpha?

Teremos uma versão simples do blockchain no ar, com um esquema para testar o acesso à blockchain privada.
Os nós presentes na rede poderão acessar suas carteias e verificar o que possuem, trocar entre si seus pontos/créditos.
A instituição, o banco, poderá é a entidade que criará os pontos distruibuindo-os para as carteiras de seus clientes.


## Softwares necessários

Foram usados os seguintes softwares para o desenvolvimento da solução:

1. Sistema Operacional: Ubuntu 17.04 Desktop atualizado com todas as atualizações at o dia 20/6/2017;
2. Implementação do Blockchain: Multichain (https://github.com/MultiChain/multichain) em sua versão 1.0 beta 2;
3. Biblioteca para Desenvolvimento: Node.js (https://nodejs.org) em sua versão 8.1.2

## Para colocar para funcionar

Comece instalando o Ubuntu 17.04 em uma máquina virtual, pode se usado qualquer um dos virtualizadores mais usados atualmente.
Sugiro o uso do VirtualBox ou o VMWare.
Atualize o SO usando os comandos: sudo apt-get update upgrade
Reinicie

Após reiniciar, vá ao terminal e baixe o multichain: wget http://www.multichain.com/download/multichain-1.0-beta-2.tar.gz
Siga os passos para instalar e multichain: http://www.multichain.com/download-install/

Para baixar o node.js: wget https://nodejs.org/dist/v8.1.2/node-v8.1.2-linux-x64.tar.xz
Baixe e instale o Node.js. Uma sugestão de passo-a-passo para o Node.js: https://www.digitalocean.com/community/tutorials/como-instalar-o-node-js-no-ubuntu-16-04-pt

Depois que tudo estiver baixado e funcionando, vamos à configuração desta implementação efetivamente:

1. Crie um diretório para o BlockchainFrequentFlyer
2. Entre no diretório e baixe o projeto: git clone 

