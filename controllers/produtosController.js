const mysql = require('../mysql');

exports.getProdutos = async (req, res, next) => {
  try {
    let nome = '';
    if(req.query.nome){
      nome = req.query.nome;
    }

    const query  = `SELECT * FROM produtos WHERE idCategoria = ? AND (nome LIKE '%${nome}%');`;
    const result = await mysql.execute(query, [req.query.idCategoria]);
    const response = {
      produtos: result.map(prod => {
        return {
          id: prod.id,
          nome: prod.nome,
          preco: prod.preco,
          imagem: prod.imagem,
          idCategoria: prod.idCategoria,
          request: {
            tipo: 'GET',
            descricao: 'Retorna os detalhes de um produto',
            url: 'http://localhost:3000/produtos/' + prod.id
          }
        }
      }),
    }
        
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error, response: null });
  }
};

exports.postProduto = async (req, res, next) => {
  try {
    const result = await mysql.execute(
      'INSERT INTO produtos (nome, preco, imagem, idCategoria) VALUES (?, ?, ?, ?);',
      [req.body.nome, req.body.preco, req.file.path, req.body.idCategoria],
    );

    const response = {
      mensagem: 'Produto cadastrado com sucesso.',
      produto: {
        id: result.insertId,
        nome: req.body.nome,
        preco: req.body.preco,
        imagem: req.file.path,
        idCategoria: req.body.idCategoria,
        request: {
          tipo: 'GET',
          descricao: 'Retorna todos os produtos',
          url: 'http://localhost:3000/produtos'
        }
      }
    }

    return res.status(201).send(response);

  } catch (error) {
    return res.status(500).send({ error: error, response: null });
  }
};

exports.getUmProduto = async (req, res, next) => {
  try {
    const result = await mysql.execute("SELECT * FROM produtos WHERE id = ?;", [req.params.id],);

    if(result.lenght === 0){
      return res.status(404).send({
        mensagem: 'Não foi encontrado produto com este ID.',
      });
    }

    const response = {
      produto: {
        id: result[0].id,
        nome: result[0].nome,
        preco: result[0].preco,
        imagem: result[0].imagem,
        idCategoria: result[0].idCategoria,
        request: {
          tipo: 'GET',
          descricao: 'Retorna todos os produtos',
          url: 'http://localhost:3000/produtos'
        }
      }
    }

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error, response: null });
  }
};

exports.putProduto = async (req, res, next) => {
  try {
    const result = await mysql.execute(`UPDATE produtos SET nome = ?, preco = ? WHERE id = ?;`, 
    [req.body.nome, req.body.preco, req.params.id],);
    
    const response = {
      mensagem: 'Produto alterado com sucesso.',
      produto: {
        id: req.params.id,
        nome: req.body.nome,
        preco: req.body.preco,
        idCategoria: req.body.idCategoria,
        request: {
          tipo: 'GET',
          descricao: 'Retorna os detalhes de um produto',
          url: 'http://localhost:3000/produtos/' + req.params.id
        }
      }
    }

    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error, response: null });
  }
};

exports.deleteProduto = async (req, res, next) => {
  try {
    const result = await mysql.execute("DELETE FROM produtos WHERE id = ?;", [req.params.id],);

    const response = {
      mensagem: 'Produto excluído com sucesso.',
      request: {
        tipo: 'POST',
        descricao: 'Cadastra um produto',
        url: 'http://localhost:3000/produtos',
        body: {
          nome: 'String',
          preco: 'Float',
        }
      }
    }

    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error, response: null });
  }
};