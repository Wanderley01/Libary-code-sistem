const db = require('../../config/database');

const pecSubCont = {
    async listar(req, res) {
        try {
            const { ordem_servico_id } = req.query;
            let query = 'SELECT * FROM pecas_substituidas';
            let params = [];

            if (ordem_servico_id) {
                query += ' WHERE ordem_servico_id = ?';
                params.push(ordem_servico_id);
            }

            const [rows] = await db.query(query, params);
            return res.json(rows);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro ao listar peças substituídas.' });
        }
    },


    async criar(req, res) {
        try {
            const { ordem_servico_id, nome_peca, quantidade, custo_unitario } = req.body;

            if (!ordem_servico_id || !nome_peca || !quantidade || !custo_unitario) {
                return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios da peça substituída.' });
            }

            const [osExiste] = await db.query('SELECT * FROM ordens_servico WHERE id = ?', [ordem_servico_id]);
            if (osExiste.length === 0) {
                return res.status(404).json({ erro: 'Ordem de serviço associada não encontrada.' });
            }

            const query = 'INSERT INTO pecas_substituidas (ordem_servico_id, nome_peca, quantidade, custo_unitario) VALUES (?, ?, ?, ?)';
            const [resultado] = await db.query(query, [ordem_servico_id, nome_peca, quantidade, custo_unitario]);

            return res.status(201).json({
                mensagem: 'Peça substituída registada com sucesso!',
                id: resultado.insertId
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro ao registar peça substituída.' });
        }
    },

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { ordem_servico_id, nome_peca, quantidade, custo_unitario } = req.body;

            const [existe] = await db.query('SELECT * FROM pecas_substituidas WHERE id = ?', [id]);
            if (existe.length === 0) {
                return res.status(404).json({ erro: 'Peça substituída não encontrada.' });
            }

            const query = 'UPDATE pecas_substituidas SET ordem_servico_id = ?, nome_peca = ?, quantidade = ?, custo_unitario = ? WHERE id = ?';
            await db.query(query, [ordem_servico_id, nome_peca, quantidade, custo_unitario, id]);

            return res.json({ mensagem: 'Peça substituída atualizada com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro ao atualizar peça substituída.' });
        }
    },

    async deletar(req, res) {
        try {
            const { id } = req.params;
            const [resultado] = await db.query('DELETE FROM pecas_substituidas WHERE id = ?', [id]);

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ erro: 'Peça substituída não encontrada.' });
            }

            return res.json({ mensagem: 'Peça substituída excluída com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro ao excluir peça substituída.' });
        }
    }
};

module.exports = pecSubCont;