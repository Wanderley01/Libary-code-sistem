
# Guia de Endpoints da API - Sistema de Manutenção Industrial (`http://localhost:3000`)

---

## 1. Equipamentos (`/api/equipamentos`)

### 1.1. Listar todos os equipamentos

* **URL:** `GET /api/equipamentos`
* **Método HTTP:** `GET`
* **Body:** `N/A`
* **Resposta Esperada (200 OK):**

```json
[
  {
    "id": 1,
    "nome": "Torno CNC 01",
    "setor": "Usinagem",
    "status": "Operacional"
  }
]

```

### 1.2. Filtrar equipamentos por status

* **URL:** `GET /api/equipamentos?status=Em manutencao`
* **Método HTTP:** `GET`
* **Body:** `N/A`
* **Resposta Esperada (200 OK):**

```json
[
  {
    "id": 2,
    "nome": "Prensa Hidráulica",
    "setor": "Pintura",
    "status": "Em manutencao"
  }
]

```

### 1.3. Criar equipamento

* **URL:** `POST /api/equipamentos`
* **Método HTTP:** `POST`
* **Body (JSON):**

```json
{
  "nome": "Fresadora Universal",
  "setor": "Usinagem",
  "status": "Operacional"
}

```

* **Resposta Esperada (201 Created):**

```json
{
  "id": 3,
  "mensagem": "Equipamento criado com sucesso"
}

```

### 1.4. Atualizar equipamento

* **URL:** `PUT /api/equipamentos/1`
* **Método HTTP:** `PUT`
* **Body (JSON):**

```json
{
  "nome": "Torno CNC 01 (Atualizado)",
  "setor": "Usinagem Pesada",
  "status": "Operacional"
}

```

* **Resposta Esperada (200 OK):**

```json
{
  "mensagem": "Equipamento atualizado com sucesso"
}

```

### 1.5. Apagar equipamento

* **URL:** `DELETE /api/equipamentos/1`
* **Método HTTP:** `DELETE`
* **Body:** `N/A`
* **Resposta Esperada (200 OK / 204 No Content):**

```json
{
  "mensagem": "Equipamento removido com sucesso"
}

```

---

## 2. Ordens de Serviço (`/api/ordens-servico`)

### 2.1. Listar todas as ordens de serviço

* **URL:** `GET /api/ordens-servico`
* **Método HTTP:** `GET`
* **Body:** `N/A`
* **Resposta Esperada (200 OK):**

```json
[
  {
    "id": 1,
    "equipamento_id": 2,
    "descricao": "Troca de óleo do sistema hidráulico",
    "status": "Aberta"
  }
]

```

### 2.2. Criar ordem de serviço

* **URL:** `POST /api/ordens-servico`
* **Método HTTP:** `POST`
* **Body (JSON):**

```json
{
  "equipamento_id": 2,
  "descricao": "Revisão elétrica geral",
  "prioridade": "Alta"
}

```

* **Resposta Esperada (201 Created):**

```json
{
  "id": 2,
  "mensagem": "Ordem de serviço criada com sucesso"
}

```

### 2.3. Atualizar ordem de serviço

* **URL:** `PUT /api/ordens-servico/1`
* **Método HTTP:** `PUT`
* **Body (JSON):**

```json
{
  "status": "Concluída",
  "observacoes": "Manutenção realizada sem intercorrências."
}

```

* **Resposta Esperada (200 OK):**

```json
{
  "mensagem": "Ordem de serviço atualizada com sucesso"
}

```

### 2.4. Apagar ordem de serviço

* **URL:** `DELETE /api/ordens-servico/1`
* **Método HTTP:** `DELETE`
* **Body:** `N/A`
* **Resposta Esperada (200 OK):**

```json
{
  "mensagem": "Ordem de serviço removida com sucesso"
}

```

---

## 3. Defeitos (`/api/defeitos`)

### 3.1. Listar todos os defeitos

* **URL:** `GET /api/defeitos`
* **Método HTTP:** `GET`
* **Body:** `N/A`
* **Resposta Esperada (200 OK):**

```json
[
  {
    "id": 1,
    "descricao": "Superaquecimento do motor",
    "severidade": "Alta"
  }
]

```

### 3.2. Filtrar defeitos

* **URL:** `GET /api/defeitos?severidade=Alta&equipamento_id=1`
* **Método HTTP:** `GET`
* **Body:** `N/A`
* **Resposta Esperada (200 OK):**

```json
[
  {
    "id": 1,
    "equipamento_id": 1,
    "descricao": "Superaquecimento do motor",
    "severidade": "Alta"
  }
]

```

### 3.3. Criar defeito

* **URL:** `POST /api/defeitos`
* **Método HTTP:** `POST`
* **Body (JSON):**

```json
{
  "equipamento_id": 1,
  "descricao": "Vibração excessiva na base",
  "severidade": "Média"
}

```

* **Resposta Esperada (201 Created):**

```json
{
  "id": 2,
  "mensagem": "Defeito registrado com sucesso"
}

```

### 3.4. Atualizar defeito

* **URL:** `PUT /api/defeitos/1`
* **Método HTTP:** `PUT`
* **Body (JSON):**

```json
{
  "descricao": "Superaquecimento do motor (Corrigido)",
  "severidade": "Baixa"
}

```

* **Resposta Esperada (200 OK):**

```json
{
  "mensagem": "Defeito atualizado com sucesso"
}

```

### 3.5. Apagar defeito

* **URL:** `DELETE /api/defeitos/1`
* **Método HTTP:** `DELETE`
* **Body:** `N/A`
* **Resposta Esperada (200 OK):**

```json
{
  "mensagem": "Defeito removido com sucesso"
}

```

---

## 4. Manutenções Preventivas (`/api/manutencoes-preventivas`)

### 4.1. Listar todas as manutenções preventivas

* **URL:** `GET /api/manutencoes-preventivas`
* **Método HTTP:** `GET`
* **Body:** `N/A`
* **Resposta Esperada (200 OK):**

```json
[
  {
    "id": 1,
    "equipamento_id": 1,
    "data_programada": "2026-11-01",
    "status": "Agendada"
  }
]

```

### 4.2. Filtrar manutenções preventivas

* **URL:** `GET /api/manutencoes-preventivas?equipamento_id=1`
* **Método HTTP:** `GET`
* **Body:** `N/A`
* **Resposta Esperada (200 OK):**

```json
[
  {
    "id": 1,
    "equipamento_id": 1,
    "data_programada": "2026-11-01",
    "status": "Agendada"
  }
]

```

### 4.3. Criar manutenção preventiva

* **URL:** `POST /api/manutencoes-preventivas`
* **Método HTTP:** `POST`
* **Body (JSON):**

```json
{
  "equipamento_id": 2,
  "data_programada": "2026-12-10",
  "descricao": "Inspeção geral e lubrificação"
}

```

* **Resposta Esperada (201 Created):**

```json
{
  "id": 2,
  "mensagem": "Manutenção preventiva criada com sucesso"
}

```

### 4.4. Atualizar manutenção preventiva

* **URL:** `PUT /api/manutencoes-preventivas/1`
* **Método HTTP:** `PUT`
* **Body (JSON):**

```json
{
  "status": "Realizada"
}

```

* **Resposta Esperada (200 OK):**

```json
{
  "mensagem": "Manutenção preventiva atualizada com sucesso"
}

```

### 4.5. Apagar manutenção preventiva

* **URL:** `DELETE /api/manutencoes-preventivas/1`
* **Método HTTP:** `DELETE`
* **Body:** `N/A`
* **Resposta Esperada (200 OK):**

```json
{
  "mensagem": "Manutenção preventiva removida com sucesso"
}

```

---

## 5. Peças Substituídas (`/api/pecas-substituidas`)

### 5.1. Listar todas as peças substituídas

* **URL:** `GET /api/pecas-substituidas`
* **Método HTTP:** `GET`
* **Body:** `N/A`
* **Resposta Esperada (200 OK):**

```json
[
  {
    "id": 1,
    "ordem_servico_id": 1,
    "nome_peca": "Rolamento 6204",
    "quantidade": 2
  }
]

```

### 5.2. Filtrar peças substituídas

* **URL:** `GET /api/pecas-substituidas?ordem_servico_id=1`
* **Método HTTP:** `GET`
* **Body:** `N/A`
* **Resposta Esperada (200 OK):**

```json
[
  {
    "id": 1,
    "ordem_servico_id": 1,
    "nome_peca": "Rolamento 6204",
    "quantidade": 2
  }
]

```

### 5.3. Criar registro de peça substituída

* **URL:** `POST /api/pecas-substituidas`
* **Método HTTP:** `POST`
* **Body (JSON):**

```json
{
  "ordem_servico_id": 1,
  "nome_peca": "Correia em V A-40",
  "quantidade": 1
}

```

* **Resposta Esperada (201 Created):**

```json
{
  "id": 2,
  "mensagem": "Peça substituída registrada com sucesso"
}

```

### 5.4. Atualizar peça substituída

* **URL:** `PUT /api/pecas-substituidas/1`
* **Método HTTP:** `PUT`
* **Body (JSON):**

```json
{
  "quantidade": 3
}

```

* **Resposta Esperada (200 OK):**

```json
{
  "mensagem": "Registro de peça atualizado com sucesso"
}

```

### 5.5. Apagar peça substituída

* **URL:** `DELETE /api/pecas-substituidas/1`
* **Método HTTP:** `DELETE`
* **Body:** `N/A`
* **Resposta Esperada (200 OK):**

```json
{
  "mensagem": "Registro de peça removido com sucesso"
}

```
