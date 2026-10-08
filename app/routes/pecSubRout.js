const express = require('express');
const router = express.Router();
const pecSubCont = require('../controllers/pecSubCont');

router.get('/', pecSubCont.listar);
router.post('/', pecSubCont.criar);
router.put('/:id', pecSubCont.atualizar);
router.delete('/:id', pecSubCont.deletar);

module.exports = router;