const mysql = require('../mysql');

exports.getCategorias = async (req, res, next) => {
  try {
    const result = await mysql.execute("SELECT * FROM categorias;");
    const response = {
      categorias: result.map(categoria => {
        return {
          id: categoria.id,
          nome: categoria.nome,
          descricao: categoria.descricao,
          request: {
            tipo: 'GET',
            descricao: 'Retorna os detalhes de uma categoria',
            url: 'http://localhost:3000/categorias/' + categoria.id
          }
        }
      }),
    }
        
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error, response: null });
  }
};

exports.postCategoria = async (req, res, next) => {
  try {
    const result = await mysql.execute(
      "INSERT INTO categorias (nome, descricao) VALUES (?, ?);",
      [req.body.nome, req.body.descricao],
    );

    const response = {
      mensagem: 'Categoria cadastrada com sucesso.',
      categoria: {
        id: result.id,
        nome: req.body.nome,
        descricao: req.body.descricao,
        request: {
          tipo: 'GET',
          descricao: 'Retorna todas as categorias',
          url: 'http://localhost:3000/categorias'
        }
      }
    }

    return res.status(201).send(response);

  } catch (error) {
    return res.status(500).send({ error: error, response: null });
  }
};

exports.getUmaCategoria = async (req, res, next) => {
  try {
    const result = await mysql.execute("SELECT * FROM categorias WHERE id = ?;", [req.params.id],);

    if(result.lenght === 0){
      return res.status(404).send({
        mensagem: 'Não foi encontrada categoria com este ID.',
      });
    }

    const response = {
      categoria: {
        id: result[0].id,
        nome: result[0].nome,
        descricao: result[0].descricao,
        request: {
          tipo: 'GET',
          descricao: 'Retorna todas as categorias',
          url: 'http://localhost:3000/categorias'
        }
      }
    }

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error, response: null });
  }
};

exports.putCategoria = async (req, res, next) => {
  try {
    const result = await mysql.execute(`UPDATE categorias SET nome = ?, descricao = ? WHERE id = ?;`, 
    [req.body.nome, req.body.descricao, req.params.id],);
    
    const response = {
      mensagem: 'Categoria alterada com sucesso.',
      categoria: {
        id: req.params.id,
        nome: req.body.nome,
        descricao: req.body.descricao,
        request: {
          tipo: 'GET',
          descricao: 'Retorna os detalhes de uma categoria',
          url: 'http://localhost:3000/categorias/' + req.params.id
        }
      }
    }

    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error, response: null });
  }
};

exports.deleteCategoria = async (req, res, next) => {
  try {
    const result = await mysql.execute("DELETE FROM categorias WHERE id = ?;", [req.params.id],);

    const response = {
      mensagem: 'Categoria excluída com sucesso.',
      request: {
        tipo: 'POST',
        descricao: 'Cadastra uma categoria',
        url: 'http://localhost:3000/categorias',
        body: {
          nome: 'String',
          descricao: 'String',
        }
      }
    }

    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error, response: null });
  }
};