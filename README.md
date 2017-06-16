## Uma implementação do uso da Blockchain 
## Matéria de Construção de Software - UnB - Junho/Julho - 2017

A ideia é fazer uma implementação para usar as vantagens da estrutura do Blockchain na contagem de pontos dos cartões de crédito e/ou milhagem para uso de troca de itens e voos aereos.

Os administradores utilizam o controle de contagem de pontos/milhagem que já existia antes, e que sempre foi usado para este fim, o controle centralizado das transações e o uso de um ponto único para a verificação das transações.

A ideia é a substituição desta tecnologia por algo mais rápido, seguro e mais economico.

O uso de blockchain tras as seguintes vangatens perante ao modelo já estabelecido:

1. **Tamanho do banco de dados distribuido**: os bancos de dados usados são grandes e com muitas informações para serem usadas afim de conseguir um nível aceitável de confiança nas transações. A implementação do blockchain irá diminuir em várias vezes menos o tamanho do bando de dados necessário para controlar e garantir a confiança dos usuários e de seus donos.

2. **Rapidez**: o tempo usado para o processamento das transações é mais rápido que o que hoje os banco usam. Talvez por ser menor o banco de dados, pelas transações terem apenas duas partes (sem o terceiro de confiança), ou por ter o processamento descentralizado, a efetivação e processamento global das transações são mais rápidas.

3. **Segurança**: com o modelo de banco de dados distribuído com o uso de chaves públicas e privadas a segurança é garantida a um nível muito alto. O esforço computacional para se conseguir burlar o mecanismo de segurança torna inviável a falsificação e com a descentralização e o uso da blockchain a segurança tende a aumentar o nível de segurança.

## Sobre a implementação efetuada

Foi realizada a implementação que realiza o controle da pontuação ou das milhares de cada cliente. 
Assumiremos que existe um banco físico (real) que possui vários clientes e possui vários clientes com cartões de crédito e com programas de milhas/pontos em seus cartões.

Cada usuário possuirá uma carteira que inicialmente não conterá nada e uma carteira do banco onde teremos todos os pontos/créditos/milhagem.

Serão realizadas as ações necessárias para que essas carteiras reflitam o estado atual de créditos disponíveis.

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/haroldomendes/blockchain/settings). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://help.github.com/categories/github-pages-basics/) or [contact support](https://github.com/contact) and we’ll help you sort it out.
