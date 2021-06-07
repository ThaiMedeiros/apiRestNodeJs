const express = require('express');
const router  = express.Router();

const UsuariosController = require('../controllers/usuariosController');

router.get('/', login.obrigatorio, UsuariosController.getUsuarios);      // lista todos os usuários
router.post('/', UsuariosController.postUsuario);                        // cadastra o usuário
router.post('/login', UsuariosController.login);                         // realiza login
router.delete('/', login.obrigatorio, UsuariosController.deleteUsuario); // deleta um usuário

module.exports = router;