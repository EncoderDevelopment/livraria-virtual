#livraria-virtual: 

Descrição: 

 - livraria-virtual é uma vitrine para compra de livros.
   O projeto está dividido em duas partes, api que provê funcionalidades de proxy. Um proxy é algo que age em nome 
   de outro, nesse caso nossa api proxy age em nome do frontend e está localizado entre LoopBack API Explorer 
   a aplicação frontend, a API fornece recursos estáveis de consulta, atualização e exclusão para um serviço 
   ou mais serviços existentes em LoopBack API Explorer.

 - Ao acessar o frontend fica visível a vitrine de livros contendo funcionalidades de consulta e ordenação 
   dos livros. Desenvolvido com responsividade atende aos devices de 360px até 4000px.
   
 - Essa primeira visão da vitrine possui uma páginas que pode ser paginada, o paginador está fixo na parte inferior da página. 
   Esta funcionalidade está disponível ao entrar no site, em: http://localhost:4200

 - Para acessar as demais funcionalidades é preciso ir para o link http://localhost:4200/book ou http://localhost:4200/author
   que contém outras opções para manter livros e autores atualizados.

Manual de instalação da Infraestrutura:

 - Requisitos: 	
	 - Angular CLI: 11.0.7 ou superior
	 - jdk 8 ou superior
	 - Node: 14.15.4 ou superior
	 - Angular: 11.0.9 ou superior
	 - maven 3.6.3 ou superior


Download e instalação do git

 - Windows: https://git-scm.com/download/win
 - MacOS: https://git-scm.com/download/mac
 - Linux: 
 	- ○ Provavelmente já está instalado. Verifique, executando o comando de
		teste abaixo: ○ Se o Git não estiver instalado, digite os seguintes comandos:
	- Ubuntu, Debian, Mint: sudo apt-get install git
	- Fedora, CentOS: sudo yum install git
 - Teste a instalação do Git
 - Digite em um Terminal
 - git --version.
 - A resposta será algo como: 
	- git version 2.25.0.


Download e instalação do Java 8 (JDK)

- Antes de baixar o JDK, você vai precisar criar uma conta na oracle caso ainda não
	 tenha uma. A criação dessa conta é gratuito. https://login.oracle.com/mysso/signon.jsp
 - Windows: 
	- https://www.oracle.com/br/java/technologies/javase/javase-jdk8-downloads.html
 - MacOS:
	- https://www.oracle.com/br/java/technologies/javase/javase-jdk8-downloads.html
 - Linux:
	- Ubuntu, Debian, Mint:
		- https://www.oracle.com/br/java/technologies/javase/javase-jdk8-downloads.html
	- ○ Fedora, CentOS:
		- https://www.oracle.com/br/java/technologies/javase/javase-jdk8-downloads.html
 - Teste a instalação da JDK:
	- ○ Abra um Terminal e digite:
		- javac -version
	- ○ A resposta deve ser algo semelhante à seguinte:
		- javac 1.8.0_212
- Para configurar a variavel de ambiente java no windows:
	- Você pode usar esse tutorial fornecido pela CAELUM
		- https://docs.google.com/document/d/1TaAt6ywMDwIVBV_-hM1mTE0_ysRvH0Dtfovr3Npt1I8/edit


Download e instalação do Maven 3

- Baixe o zip do Maven no link:
	- https://maven.apache.org/download.cgi
- Extraia o zip baixado no passo anterior em um diretório de sua preferência. 
- Dica: 
	- evite espaços no nome dos diretórios.
- Coloque a pasta bin do Maven na variável de ambiente PATH.
	- N○ No Windows:
		- Entre nas propriedades do diretório Computador
		- Clique na aba Avançado
		- Clique no botão Variáveis de ambiente.
		- Crie (ou atualize) a variável de ambiente PATH com algo como
			- C:\Program Files\apache-maven-3.6.3\bin.
	- N○ No MacOS:
		- Edite o arquivo .bash_profile do Home de seu usuário
		- Inclua a linha que define a variável de ambiente PATH, algo como:
			- export PATH=/opt/apache-maven-3.6.3/bin:$PATH
	- N○ No Linux:
		- Edite o arquivo .bashrc do Home de seu usuário
		- Inclua a linha que define a variável de ambiente PATH, algo como:
			- export PATH=/opt/apache-maven-3.6.3/bin:$PATH
- Certifique-se que há uma variável de ambiente JAVA_HOME apontando para o diretório da sua JDK. 
	- Por exemplo, no Windows seria algo como C:\Program Files\Java\jdk1.8.0_212 e, no Linux, algo como /usr/lib/jvm/java-8-oracle
- Teste a instalação do Maven
- Abra um Terminal e digite:
	- mvn -v
- Deve ser exibido algo como:
	- Apache Maven 3.6.3 (cecedd343002696d0abb50b32b541b8a6ba2883f)



Download e instalação do Node.js
 - Baixe e instale o NodeJS versão LTS pelo site oficial: https://nodejs.org/en/ 
 - Ao baixar diretamente pelo site, o próprio site já indicará o instalador apropriado para seu sistema operacional.
	- Teste a instalação do NodeJS
	- Após a instalação do NodeJS, para verificar se tudo está correto, abra o Terminal do computador e execute o comando:
		- node -v
		- Este comando deverá exibir o número da versão do NodeJS. Algo como:
			- 12.16.1
		- Digite também outro comando para garantir que o NPM também foi instalado com o NodeJS:
			- npm -v
		- Deverá ser retornado algum outro número como:
			- 6.14.3


Angular CLI
 - Faça a instalação do Angular CLI
 - Com o NodeJS e NPM instalados, temos que agora instalar o Angular CLI. Para isso, abra o terminal e execute:
	- npm install -g @angular/cli
	- Teste a instalação do Angular CLI
	- Depois de instalado, execute:
		- ng version
	- Deve ser retornado algo semelhante a:
		- Angular CLI: 8.3.14
		- Node: 12.13.0







Comandos para instalação e execução do projeto: 

 - via git bash: execução da api usando maven: 
		 - Entra na pasta: 
			 - cd livraria-virtual/api/

		 - Instala os packages, compilar e testar o projeto, cria a pasta target com o jar:
			 - mvn clean install

		 - Inicia o servidor spring boot, tudo em um único comando:
			 - mvn clean package spring-boot:run


	 - via git bash: execução da vitrine usando npm:  
		 - Entra na pasta: 
			 - cd livraria-virtual/vitrine/

		 - Instala os recursos de package.json: 
			 - npm install

		 - Inicia o servidor do Angular: 
			 - ng serve 



Desenvolvimento e execução opcional 

	 - O projeto api foi desenvolvido com a ferramenta Spring Boot Tools Version: 4.5.0.RELEASE
	 - O projeto vitrine foi desenvolvido com a ferramenta Visual Studio Code Version: 1.53.0



Tecnologias utilizadas na api: 

 - OpenFeign: 

 	- Feign é um cliente Rest Declarativo que prove de serviço da Web declarativo. Facilita a escrita de clientes de serviço da Web.
   	  Fornece abstração e economia de código se comparado ao RestTemplate.
	  A notação @EnableFeignClients na class Application habilita a utilização do OpenFeign


- Lombok:  

	 - O Lombok é uma biblioteca java que se conecta automaticamente às ferramentas de construção, aprimorando o código java.
   	   Abstrai a escrita de getter, setter e equals, anotações de classe e construtores completo, Automatiza variáveis 
	   de registro.


- Spring Data JPA: 

	 - Utilizamos o Spring Data JPA para prover a interface de paginação. A paginação costuma ser útil quando temos um 
	  grande conjunto de dados e queremos apresentá-lo ao usuário em partes menores. Além disso, frequentemente precisamos
	  classificar esses dados por alguns critérios durante a paginação. 
  	  Classificação, da mesma forma, para apenas classificar os resultados da consulta, podemos simplesmente passar uma 
  	  instância de Sort para o método.



Tecnologias utilizadas na vitrine: 

	 - Material Angular: 
	 	- Biblioteca de componentes de material design para Angular.
	 - Angular Bootstrap: 
		- Biblioteca de componentes de Angular Bootstrap.
	 - TypeScript
	 - CSS
	 - HTML


Endpoints LoopBack API Explorer: 

	 - https://bibliapp.herokuapp.com/api/books?filter[limit]={limit}&filter[skip]={skip}
	 - https://bibliapp.herokuapp.com/api/books?filter[where][title][like]={search}
	 - https://bibliapp.herokuapp.com/api/books/count
	 - https://bibliapp.herokuapp.com/api/books/replaceOrCreate
	 - https://bibliapp.herokuapp.com/api/books/{id}
	 - https://bibliapp.herokuapp.com/api/authors
	 - https://bibliapp.herokuapp.com/api/authors/{id}
	 - https://bibliapp.herokuapp.com/api/authors?filter[limit]={limit}&filter[skip]={skip}
	 - https://bibliapp.herokuapp.com/api/authors?filter[where][firstName[like]={search}
	 - https://bibliapp.herokuapp.com/api/authors/count
	 - https://bibliapp.herokuapp.com/api/authors/replaceOrCreate
	 - https://bibliapp.herokuapp.com/api/authors/{id}


Endpoints api: 

	 - http://localhost:8080/api/book/findPage
	 - http://localhost:8080/api/book/saveOrUpdate
	 - http://localhost:8080/api/book/findLikeBook
	 - http://localhost:8080/api/book/delete/{id}
	 - http://localhost:8080/api/author/findAll
	 - http://localhost:8080/api/author/findPage
	 - http://localhost:8080/api/author/saveOrUpdate
	 - http://localhost:8080/api/author/findLikeBook
	 - http://localhost:8080/api/author/delete/{id}


Lista de rotas da vitrine: 

	 - http://localhost:4200/
	 - http://localhost:4200/vitrine
	 - http://localhost:4200/book
	 - http://localhost:4200/book/add-book
	 - http://localhost:4200/book/edit-book
	 - http://localhost:4200/book/add-author
	 - http://localhost:4200/author
	 - http://localhost:4200/author/edit-author
	 - http://localhost:4200/author/edit-author
	 - http://localhost:4200/author/add-book


Vitrine:

 - http://localhost:4200/vitrine
	 - Ações
		 - Listar
		 - Paginação
		 - Pesquisa textual: Título de livro
		 - Filtro: Titulo de livro, Autor


Observação:
 - A vitrine não tem opção de menu para acessar os formulários de manutenção dos autores e nem de manutenção de livros


Para acessar o formulário de manutenção de livros
- http://localhost:4200/book
	 - Ações:
	 - Listar
	 - Editar	
	 - Excluir
	 - Paginação
	 - Pesquisa textual: Título de livro
  
Para acessar o formulário de manutenção de autores
 - http://localhost:4200/author
	 - Ações:
	 - Listar
	 - Editar
	 - Excluir
	 - Pesquisa textual: Primeiro nome


