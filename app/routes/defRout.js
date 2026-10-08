const express = require('express');
const router = express.Router();
const defCont = require('../controllers/defCont');

router.get('/', defCont.listar);
router.post('/', defCont.criar);
router.put('/:id', defCont.atualizar);
router.delete('/:id', defCont.deletar);

module.exports = router;