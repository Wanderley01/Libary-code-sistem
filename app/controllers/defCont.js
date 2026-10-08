const db = require('../../config/database');

const defCont = {

    async listar(req, res) {
        try {
            const { severidade, equipamento_id } = req.query;
            let query = 'SELECT * FROM defeitos';
            let params = [];
            let conditions = [];

            if (severidade) {
                conditions.push('severidade = ?');
                params.push(severidade);
            }
            if (equipamento_id) {
                conditions.push('equipamento_id = ?');
                params.push(equipamento_id);
            }

            if (conditions.length > 0) {
                query += ' WHERE ' + conditions.join(' AND ');
            }

            const [rows] = await db.query(query, params);
            return res.json(rows);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro ao listar defeitos.' });
        }
    },


    async criar(req, res) {
        try {
            const { equipamento_id, descricao, severidade, data_registro } = req.body;

            if (!equipamento_id || !descricao || !severidade || !data_registro) {
                return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios do defeito.' });
            }

            
            const [equipamentoExiste] = await db.query('SELECT * FROM equipamentos WHERE id = ?', [equipamento_id]);
            if (equipamentoExiste.length === 0) {
                return res.status(404).json({ erro: 'Equipamento associado não encontrado.' });
            }

            const query = 'INSERT INTO defeitos (equipamento_id, descricao, severidade, data_registro) VALUES (?, ?, ?, ?)';
            const [resultado] = await db.query(query, [equipamento_id, descricao, severidade, data_registro]);

            return res.status(201).json({
                mensagem: 'Defeito registado com sucesso!',
                id: resultado.insertId
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro ao registar defeito.' });
        }
    },

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { equipamento_id, descricao, severidade, data_registro } = req.body;

            const [existe] = await db.query('SELECT * FROM defeitos WHERE id = ?', [id]);
            if (existe.length === 0) {
                return res.status(404).json({ erro: 'Defeito não encontrado.' });
            }

            const query = 'UPDATE defeitos SET equipamento_id = ?, descricao = ?, severidade = ?, data_registro = ? WHERE id = ?';
            await db.query(query, [equipamento_id, descricao, severidade, data_registro, id]);

            return res.json({ mensagem: 'Defeito atualizado com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro ao atualizar defeito.' });
        }
    },


    async deletar(req, res) {
        try {
            const { id } = req.params;
            const [resultado] = await db.query('DELETE FROM defeitos WHERE id = ?', [id]);

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ erro: 'Defeito não encontrado.' });
            }

            return res.json({ mensagem: 'Defeito excluído com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro ao excluir defeito.' });
        }
    }
};

module.exports = defCont;