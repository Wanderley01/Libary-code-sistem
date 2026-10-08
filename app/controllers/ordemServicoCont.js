const db = require('../../config/database');

const ordemServicoCont = {

    async listar(req, res) {
        try {
            const [rows] = await db.query('SELECT * FROM ordens_servico');
            return res.json(rows);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro ao listar ordens de serviço.' });
        }
    },


    async criar(req, res) {
        try {
            const { equipamento_id, tipo, data_abertura, data_conclusao, responsavel, status } = req.body;

            if (!equipamento_id || !tipo || !data_abertura || !responsavel || !status) {
                return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios da ordem de serviço.' });
            }

        
            const [equipamentoExiste] = await db.query('SELECT * FROM equipamentos WHERE id = ?', [equipamento_id]);
            if (equipamentoExiste.length === 0) {
                return res.status(404).json({ erro: 'Equipamento associado não encontrado.' });
            }

            const query = 'INSERT INTO ordens_servico (equipamento_id, tipo, data_abertura, data_conclusao, responsavel, status) VALUES (?, ?, ?, ?, ?, ?)';
            const [resultado] = await db.query(query, [equipamento_id, tipo, data_abertura, data_conclusao || null, responsavel, status]);

            return res.status(201).json({
                mensagem: 'Ordem de serviço criada com sucesso!',
                id: resultado.insertId
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro ao criar ordem de serviço.' });
        }
    },


    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { equipamento_id, tipo, data_abertura, data_conclusao, responsavel, status } = req.body;

            const [existe] = await db.query('SELECT * FROM ordens_servico WHERE id = ?', [id]);
            if (existe.length === 0) {
                return res.status(404).json({ erro: 'Ordem de serviço não encontrada.' });
            }

            const query = 'UPDATE ordens_servico SET equipamento_id = ?, tipo = ?, data_abertura = ?, data_conclusao = ?, responsavel = ?, status = ? WHERE id = ?';
            await db.query(query, [equipamento_id, tipo, data_abertura, data_conclusao || null, responsavel, status, id]);

            return res.json({ mensagem: 'Ordem de serviço atualizada com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro ao atualizar ordem de serviço.' });
        }
    },

    async deletar(req, res) {
        try {
            const { id } = req.params;

            
            const [pecasVinculadas] = await db.query('SELECT * FROM pecas_substituidas WHERE ordem_servico_id = ?', [id]);
            if (pecasVinculadas.length > 0) {
                return res.status(400).json({
                    erro: 'Não é possível excluir esta ordem de serviço pois existem peças substituídas vinculadas a ela.'
                });
            }

            const [resultado] = await db.query('DELETE FROM ordens_servico WHERE id = ?', [id]);
            if (resultado.affectedRows === 0) {
                return res.status(404).json({ erro: 'Ordem de serviço não encontrada.' });
            }

            return res.json({ mensagem: 'Ordem de serviço excluída com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro ao excluir ordem de serviço.' });
        }
    }
};

module.exports = ordemServicoCont;