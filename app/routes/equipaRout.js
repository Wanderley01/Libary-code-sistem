const express = require('express');
const router = express.Router();
const equipaCont = require('../controllers/equipaCont');

router.get('/', equipaCont.listar);
router.post('/', equipaCont.criar);
router.put('/:id', equipaCont.atualizar);
router.delete('/:id', equipaCont.deletar);

module.exports = router;