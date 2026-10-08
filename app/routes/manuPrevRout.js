const express = require('express');
const router = express.Router();
const manuPrevCont = require('../controllers/manuPrevCont');

router.get('/', manuPrevCont.listar);
router.post('/', manuPrevCont.criar);
router.put('/:id', manuPrevCont.atualizar);
router.delete('/:id', manuPrevCont.deletar);

module.exports = router;