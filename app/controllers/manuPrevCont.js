const db = require('../../config/database');

const manuPrevCont = {
    
    async listar(req, res) {
        try {
            const { equipamento_id } = req.query;
            let query = 'SELECT * FROM manutencoes_preventivas';
            let params = [];

            if (equipamento_id) {
                query += ' WHERE equipamento_id = ?';
                params.push(equipamento_id);
            }

            const [rows] = await db.query(query, params);
            return res.json(rows);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro ao listar manutenções preventivas.' });
        }
    },

    async criar(req, res) {
        try {
            const { equipamento_id, data_programada, periodicidade_dias, descricao, status } = req.body;

            if (!equipamento_id || !data_programada || !periodicidade_dias || !status) {
                return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios da manutenção preventiva.' });
            }

           
            const [equipamentoExiste] = await db.query('SELECT * FROM equipamentos WHERE id = ?', [equipamento_id]);
            if (equipamentoExiste.length === 0) {
                return res.status(404).json({ erro: 'Equipamento associado não encontrado.' });
            }

            const query = 'INSERT INTO manutencoes_preventivas (equipamento_id, data_programada, periodicidade_dias, descricao, status) VALUES (?, ?, ?, ?, ?)';
            const [resultado] = await db.query(query, [equipamento_id, data_programada, periodicidade_dias, descricao || null, status]);

            return res.status(201).json({
                mensagem: 'Manutenção preventiva programada com sucesso!',
                id: resultado.insertId
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro ao programar manutenção preventiva.' });
        }
    },

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { equipamento_id, data_programada, periodicidade_dias, descricao, status } = req.body;

            const [existe] = await db.query('SELECT * FROM manutencoes_preventivas WHERE id = ?', [id]);
            if (existe.length === 0) {
                return res.status(404).json({ erro: 'Manutenção preventiva não encontrada.' });
            }

            const query = 'UPDATE manutencoes_preventivas SET equipamento_id = ?, data_programada = ?, periodicidade_dias = ?, descricao = ?, status = ? WHERE id = ?';
            await db.query(query, [equipamento_id, data_programada, periodicidade_dias, descricao || null, status, id]);

            return res.json({ mensagem: 'Manutenção preventiva atualizada com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro ao atualizar manutenção preventiva.' });
        }
    },

    async deletar(req, res) {
        try {
            const { id } = req.params;
            const [resultado] = await db.query('DELETE FROM manutencoes_preventivas WHERE id = ?', [id]);

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ erro: 'Manutenção preventiva não encontrada.' });
            }

            return res.json({ mensagem: 'Manutenção preventiva excluída com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro ao excluir manutenção preventiva.' });
        }
    }
};

module.exports = manuPrevCont;