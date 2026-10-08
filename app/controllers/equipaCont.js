const db = require('../../config/database');

const equipaCont = {
    async listar(req, res) {
        try {
            const { status } = req.query;
            let query = 'SELECT * FROM equipamentos';
            let params = [];

            if (status) {
                query += 'WHERE status = ?';
                params.push(status);
            }

            const [rows] = await db.query(query, params);
            return res.json(rows);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'ERRO LISTAR EQUIPAMENTO'});
        }
    },

    async criar(req,res) {
        try{
            const {nome, modelo, fabricante, data_instalacao, status} = req.body;

            if(!nome || !modelo || !fabricante || !data_instalacao || !status) {
                return res.status(400).json({erro: 'PREECHER TODOS OS CAMPOS'})
            }

            const query = 'INSERT INTO equipamentos (nome,modelo,fabricante,data_instalacao,status) VALUES (?,?,?,?,?)';
            const[resultado] = await db.query(query, [nome,modelo,fabricante,data_instalacao,status]);

            return res.status(201).json({
                mensage: 'EQUIPAMENTO CADASTRADO!',
                id : resultado.insertId
            });

        } catch (erro) {
            constole.error(error);
            return res.status(500).json({ erro: 'ERRO AO CADASTRAR EQUIPAMENTO'})
        }
    },
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, modelo, fabricante, data_instalacao, status } = req.body;

            const [existe] = await db.query('SELECT * FROM equipamentos WHERE id = ?', [id]);
            if (existe.length === 0) {
                return res.status(404).json({ erro: 'Equipamento inexistente.' });
            }

            const query = 'UPDATE equipamentos SET nome = ?, modelo = ?, fabricante = ?, data_instalacao = ?, status = ? WHERE id = ?';
            await db.query(query, [nome, modelo, fabricante, data_instalacao, status, id]);

            return res.json({ mensagem: 'Equipamento atualizado com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro ao atualizar equipamento.' });
        }
    },

    async deletar(req, res) {
        try {
            const { id } = req.params;

            // Verifica se existem ordens de serviço vinculadas a este equipamento
            const [osVinculadas] = await db.query('SELECT * FROM ordens_servico WHERE equipamento_id = ?', [id]);
            if (osVinculadas.length > 0) {
                return res.status(400).json({
                    erro: 'Não é possível excluir o equipamento pois existem ordens de serviço vinculadas a ele.'
                });
            }

            // Verifica se existem defeitos vinculados (boa prática)
            const [defeitosVinculados] = await db.query('SELECT * FROM defeitos WHERE equipamento_id = ?', [id]);
            if (defeitosVinculados.length > 0) {
                return res.status(400).json({
                    erro: 'Não é possível excluir o equipamento pois existem registros de defeitos vinculados a ele.'
                });
            }

            const [resultado] = await db.query('DELETE FROM equipamentos WHERE id = ?', [id]);
            if (resultado.affectedRows === 0) {
                return res.status(404).json({ erro: 'Equipamento não encontrado.' });
            }

            return res.json({ mensagem: 'Equipamento excluído com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro ao excluir equipamento.' });
        }
    }
};


module.exports = equipaCont;