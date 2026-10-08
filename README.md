GUIA DE URLS PARA O INSOMNIA
PORTA: http://localhost:3000

EQUIPAMENTOS (/api/equipamentos)
Listar todos: GET /api/equipamentos
Filtrar status: GET /api/equipamentos?status=Em manutencao
Criar: POST /api/equipamentos (enviar JSON no body)
Atualizar: PUT /api/equipamentos/1
Apagar: DELETE /api/equipamentos/1

ORDENS DE SERVICO (/api/ordens-servico)
Listar todas: GET /api/ordens-servico
Criar: POST /api/ordens-servico (enviar JSON no body)
Atualizar: PUT /api/ordens-servico/1
Apagar: DELETE /api/ordens-servico/1

DEFEITOS (/api/defeitos)
Listar todos: GET /api/defeitos
Filtrar: GET /api/defeitos?severidade=Alta&equipamento_id=1
Criar: POST /api/defeitos (enviar JSON no body)
Atualizar: PUT /api/defeitos/1
Apagar: DELETE /api/defeitos/1

MANUTENCOES PREVENTIVAS (/api/manutencoes-preventivas)
Listar todas: GET /api/manutencoes-preventivas
Filtrar: GET /api/manutencoes-preventivas?equipamento_id=1
Criar: POST /api/manutencoes-preventivas (enviar JSON no body)
Atualizar: PUT /api/manutencoes-preventivas/1
Apagar: DELETE /api/manutencoes-preventivas/1

PECAS SUBSTITUIDAS (/api/pecas-substituidas)
Listar todas: GET /api/pecas-substituidas
Filtrar: GET /api/pecas-substituidas?ordem_servico_id=1
Criar: POST /api/pecas-substituidas (enviar JSON no body)
Atualizar: PUT /api/pecas-substituidas/1
Apagar: DELETE /api/pecas-substituidas/1