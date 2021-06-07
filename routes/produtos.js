const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const login   = require('../middleware/login');

const ProdutosController = require('../controllers/produtosController');

const storage = multer.diskStorage({
  destination: function(req, file, callback){
    callback(null, './uploads/');
  },
  filename: function(req, file, callback){
    let data = new Date().toISOString().replace(/:/g, '-') + '-';
    callback(null, data + file.originalname);
  }
});

const fileFilter = function(req, file, callback){
  if((file.mimetype === 'image/jpeg') || (file.mimetype === 'image/jpg') || (file.mimetype === 'image/png')){
    callback(null, true);
  }
  else{
    callback(null, false);
  }
}

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter,
});

router.get('/', ProdutosController.getProdutos);                                               // listar todos os produtos
router.post('/', login.obrigatorio, upload.single('imagem'), ProdutosController.postProduto);  // cadastrar produto
router.get('/:id', ProdutosController.getUmProduto);                                           // retorna os dados do produto passado
router.put('/:id', login.obrigatorio, upload.single('imagem'), ProdutosController.putProduto); // atualizar produto
router.delete('/:id', login.obrigatorio, ProdutosController.deleteProduto);                    // deletar produto

module.exports = router;