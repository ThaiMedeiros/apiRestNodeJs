const express = require('express');
const router  = express.Router();
const login   = require('../middleware/login');

const CategoriasController = require('../controllers/categoriasController');

router.get('/', CategoriasController.getCategorias);                            // listar todos as categorias
router.post('/', login.obrigatorio, CategoriasController.postCategoria);        // cadastrar categoria
router.get('/:id', CategoriasController.getUmaCategoria);                       // retorna os dados da categoria passada
router.put('/:id', login.obrigatorio, CategoriasController.putCategoria);       // atualizar categoria
router.delete('/:id', login.obrigatorio, CategoriasController.deleteCategoria); // deletar categoria

module.exports = router;