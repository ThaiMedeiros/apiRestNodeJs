const express = require('express');
const router  = express.Router();

const PedidosController = require('../controllers/pedidosController');

router.get('/', login.obrigatorio, PedidosController.getPedidos);         // listar todos os pedidos
router.post('/', PedidosController.postPedido);                           // cadastrar pedido
router.get('/:id', login.obrigatorio, PedidosController.getUmPedido);     // retorna os dados do pedido passado
router.delete('/:id', login.obrigatorio, PedidosController.deletePedido); // deletar pedido

module.exports = router;