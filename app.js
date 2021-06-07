const express    = require('express');
const app        = express();
const morgan     = require('morgan');
const bodyParser = require('body-parser');

const rotaProdutos = require('./routes/produtos');
const rotaPedidos  = require('./routes/pedidos');
const rotaUsuarios = require('./routes/usuarios');
const rotaCategorias = require('./routes/categorias');

// monitora a execução das requisições da api
// (passando o ambiente em que a api está sendo executada)
app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));      // tornando o diretório público
app.use(bodyParser.urlencoded({ extended: false })); // aceitando apenas dados simples
app.use(bodyParser.json());                          // aceitando apenas o formato json no body

// tratando o cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Header',
    'Origin',
    'X-Requrested-With', 
    'Content-Type',
    'Accept',
    'Authorization',
  );
  
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    return res.status(200).send({});
  }

  next();
});

app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);
app.use('/usuarios', rotaUsuarios);
app.use('/categorias', rotaCategorias);

// caso o morgan não encontrar nenhuma rota, entrará no método abaixo
app.use((req, res, next) => {
  const erro  = new Error('Não enncontrado!');
  erro.status = 404;
  next(erro);
});

// tratamento de erro
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.message,
    },
  });
});

module.exports = app;