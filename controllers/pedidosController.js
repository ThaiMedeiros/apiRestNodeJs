const mysql = require('../mysql').pool;

exports.getPedidos = async (req, res, next) => {
  try {
    const result = await mysql.execute(`SELECT pedidos.id, pedidos.quantidade, produtos.id, produtos.nome, produtos.preco
    FROM pedidos INNER JOIN produtos ON produtos.id = pedidos.idProduto;`,);
    
    const response = {
      pedidos: result.map(pedido => {
        return {
          id: pedido.id,
          idProduto: pedido.idProduto,
          quantidade: pedido.quantidade,
          produto: {
            id: pedido.idProduto,
            nome: pedido.nome,
            preco: pedido.preco, 
          },
          request: {
            tipo: 'GET',
            descricao: 'Retorna os detalhes de um pedido',
            url: 'http://localhost:3000/pedidos/' + pedido.id,
          },
        }
      }),
    }

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error, response: null });
  }
};

exports.postPedido = async (req, res, next) => {
  try {
    const resultProduto = await mysql.execute('SELECT * FROM produtos WHERE id = ?;', [req.body.idProduto]);
  
    if(resultProduto.lenght === 0){
      return res.status(404).send({
        mensagem: 'Não foi encontrado produto com este ID.',
      });
    }

    const resultPedido = await mysql.execute('INSERT INTO pedidos (idProduto, quantidade) VALUES (?, ?);', 
    [req.body.idProduto, req.body.quantidade]);

    const response = {
      mensagem: 'Pedido cadastrado com sucesso.',
      produto: {
        id: resultPedido.insertId,
        idProduto: req.body.idProduto,
        quantidade: req.body.quantidade,
        request: {
          tipo: 'GET',
          descricao: 'Retorna todos os pedidos',
          url: 'http://localhost:3000/pedidos',
        },
      }
    }

    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error: error, response: null });
  }
};

exports.getUmPedido = async (req, res, next) => {
  try {
    const result = await mysql.execute('SELECT * FROM pedidos WHERE id = ?;', [req.params.id],);
  
    if(result.lenght === 0){
      return res.status(404).send({
        mensagem: 'Não foi encontrado pedido com este ID.',
      });
    }

    const response = {
      produto: {
        id: result[0].id,
        idProduto: result[0].idProduto,
        quantidade: result[0].quantidade,
        request: {
          tipo: 'GET',
          descricao: 'Retorna todos os pedidos',
          url: 'http://localhost:3000/pedidos',
        },
      }
    }

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error, response: null });
  }
};

exports.deletePedido = async (req, res, next) => {
  try {
    const result = await mysql.execute('DELETE FROM pedidos WHERE id = ?;', [req.params.id],);
    
    const response = {
      mensagem: 'Pedido excluído com sucesso.',
      request: {
        tipo: 'POST',
        descricao: 'Cadastra um pedido',
        url: 'http://localhost:3000/pedidos',
        body: {
          idProduto: 'Inteiro (Id de produto já cadastrado)',
          quantidade: 'Inteiro',
        },
      }
    }

    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error, response: null });
  }
};