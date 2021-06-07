# API Request em Node.js

Uma API Request em node.js para cadastro de produtos.

para utilizar a API siga as seguintes instruções:

1. No terminal vá até a raiz da API.
2. Já na raiz, instale as dependências através do comando:

-- **npm install**

3. Execute seu servidor de banco de dados MySQL.
4. Crie um banco de dados chamado: **testeapi**

-- Após a criação, importe o arquivo que está na pasta: **banco_de_dados**

5. Para rodar a aplicação, vá novamente a raiz e digite o seguinte comando:

-- **npm start**

6. Após a aplicação rodando, recomendo utilizar o **Postman** para fazer as requisições.

-- Dentro da pasta: **collection_postman**, estão todas as requisições da API configuradas.

**Observações:**

- Caso a pasta de upload não exista, crie-a na raiz.
- Após importar a collection do postman, caso a variável url esteja sem o valor padrão, siga os seguintes passos: **(essas configurações são opcionais)**

1. Passe o mouse em cima, e clique nos 3 (...) ao lado do nome e vá na opção: **Edit**
2. Logo após, no menu superior, clique na opção: **Variables**
3. Em variables, crie uma chamada: **url** e no initial value e em current value insira: **localhost:3000** ou a localização da url padrão onde você está executando a aplicação.
4. Pronto, suas variáveis de ambiente estão criadas. Isso poupa-lhes tempo de ficar digitando a url inteira, além de viualmente deixá-la mais "enxuta", já que algumas são grandes.
