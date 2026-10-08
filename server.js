const express = require('express');
const cors = require('cors')
require('dotenv').config();

const db = require('./config/database');
//------------------------ROUTAS---------------------------------------------------

const equipaRout = require('./app/routes/equipaRout');
const ordemServicoRout = require('./app/routes/ordemServicoRout');
const defRout = require('./app/routes/defRout');
const manuPrevRout = require('./app/routes/manuPrevRout');
const pecSubRout = require('./app/routes/pecSubRout');

//--------------------------------------------------------------------------
const app = express();

app.use(cors());
app.use(express.json());
//-----------------------URL_ROTAS---------------------------------------------------

app.use('/api/equipamentos', equipaRout)
app.use('/api/ordens-servico', ordemServicoRout);
app.use('/api/defeitos', defRout);
app.use('/api/manutencoes-preventivas', manuPrevRout);
app.use('/api/pecas-substituidas', pecSubRout);

//--------------------------------------------------------------------------
app.get('/', (req,res) => {
    res.json({
        mensage: 'API rodando!'
    })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('SERVER NO AR BABY!');
});