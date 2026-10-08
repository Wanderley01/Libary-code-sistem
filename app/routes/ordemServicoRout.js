const express = require('express');
const router = express.Router();
const ordemServicoCont = require('../controllers/ordemServicoCont');

router.get('/', ordemServicoCont.listar);
router.post('/', ordemServicoCont.criar);
router.put('/:id', ordemServicoCont.atualizar);
router.delete('/:id', ordemServicoCont.deletar);

module.exports = router;