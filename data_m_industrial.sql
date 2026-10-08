-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 08/10/2026 às 22:12
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `data_m_industrial`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `defeitos`
--

CREATE TABLE `defeitos` (
  `id` int(11) NOT NULL,
  `equipamento_id` int(11) NOT NULL,
  `descricao` text NOT NULL,
  `severidade` enum('Baixo','Médio','Alto','Crítico') NOT NULL,
  `data_registro` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `defeitos`
--

INSERT INTO `defeitos` (`id`, `equipamento_id`, `descricao`, `severidade`, `data_registro`) VALUES
(1, 2, 'Superaquecimento do motor', 'Crítico', '2026-10-08'),
(2, 3, 'Vibração excessiva', 'Médio', '2026-10-08');

-- --------------------------------------------------------

--
-- Estrutura para tabela `equipamentos`
--

CREATE TABLE `equipamentos` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `fabricante` varchar(100) NOT NULL,
  `data_instalacao` date NOT NULL,
  `status` enum('Ativo','Em manutenção','Inativo') DEFAULT 'Ativo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `equipamentos`
--

INSERT INTO `equipamentos` (`id`, `nome`, `modelo`, `fabricante`, `data_instalacao`, `status`) VALUES
(1, 'Motor Industrial', 'MTR-100', 'WEG', '2024-01-10', 'Ativo'),
(2, 'Esteira Industrial', 'EST-200', 'Siemens', '2023-06-15', 'Em manutenção'),
(3, 'Compressor', 'CMP-300', 'Atlas Copco', '2022-08-20', 'Ativo'),
(4, 'teste', 'labubu', 'zeka', '2026-01-10', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `manutencoes_preventivas`
--

CREATE TABLE `manutencoes_preventivas` (
  `id` int(11) NOT NULL,
  `equipamento_id` int(11) NOT NULL,
  `periodicidade_dias` int(11) NOT NULL,
  `ultima_manutencao` date DEFAULT NULL,
  `proxima_manutencao` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `manutencoes_preventivas`
--

INSERT INTO `manutencoes_preventivas` (`id`, `equipamento_id`, `periodicidade_dias`, `ultima_manutencao`, `proxima_manutencao`) VALUES
(1, 1, 30, '2026-09-08', '2026-10-07'),
(2, 3, 90, '2026-10-08', '2027-01-06');

-- --------------------------------------------------------

--
-- Estrutura para tabela `ordens_servico`
--

CREATE TABLE `ordens_servico` (
  `id` int(11) NOT NULL,
  `equipamento_id` int(11) NOT NULL,
  `tipo` enum('Preventiva','Corretiva') NOT NULL,
  `data_abertura` date NOT NULL,
  `data_conclusao` date DEFAULT NULL,
  `responsavel` varchar(100) NOT NULL,
  `status` enum('Aberta','Em andamento','Finalizada') DEFAULT 'Aberta'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `ordens_servico`
--

INSERT INTO `ordens_servico` (`id`, `equipamento_id`, `tipo`, `data_abertura`, `data_conclusao`, `responsavel`, `status`) VALUES
(1, 1, 'Preventiva', '2026-10-08', NULL, 'Carlos', 'Aberta'),
(2, 2, 'Corretiva', '2026-10-08', NULL, 'João', 'Em andamento');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pecas_substituidas`
--

CREATE TABLE `pecas_substituidas` (
  `id` int(11) NOT NULL,
  `nome_peca` varchar(100) NOT NULL,
  `codigo_peca` varchar(50) NOT NULL,
  `quantidade` int(11) NOT NULL,
  `custo_unitario` decimal(10,2) NOT NULL,
  `ordem_servico_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pecas_substituidas`
--

INSERT INTO `pecas_substituidas` (`id`, `nome_peca`, `codigo_peca`, `quantidade`, `custo_unitario`, `ordem_servico_id`) VALUES
(1, 'Rolamento', 'ROL-001', 2, 75.00, 2),
(2, 'Correia', 'COR-002', 1, 120.00, 2);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `defeitos`
--
ALTER TABLE `defeitos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equipamento_id` (`equipamento_id`);

--
-- Índices de tabela `equipamentos`
--
ALTER TABLE `equipamentos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `manutencoes_preventivas`
--
ALTER TABLE `manutencoes_preventivas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equipamento_id` (`equipamento_id`);

--
-- Índices de tabela `ordens_servico`
--
ALTER TABLE `ordens_servico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equipamento_id` (`equipamento_id`);

--
-- Índices de tabela `pecas_substituidas`
--
ALTER TABLE `pecas_substituidas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ordem_servico_id` (`ordem_servico_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `defeitos`
--
ALTER TABLE `defeitos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `equipamentos`
--
ALTER TABLE `equipamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `manutencoes_preventivas`
--
ALTER TABLE `manutencoes_preventivas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `ordens_servico`
--
ALTER TABLE `ordens_servico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `pecas_substituidas`
--
ALTER TABLE `pecas_substituidas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `defeitos`
--
ALTER TABLE `defeitos`
  ADD CONSTRAINT `defeitos_ibfk_1` FOREIGN KEY (`equipamento_id`) REFERENCES `equipamentos` (`id`);

--
-- Restrições para tabelas `manutencoes_preventivas`
--
ALTER TABLE `manutencoes_preventivas`
  ADD CONSTRAINT `manutencoes_preventivas_ibfk_1` FOREIGN KEY (`equipamento_id`) REFERENCES `equipamentos` (`id`);

--
-- Restrições para tabelas `ordens_servico`
--
ALTER TABLE `ordens_servico`
  ADD CONSTRAINT `ordens_servico_ibfk_1` FOREIGN KEY (`equipamento_id`) REFERENCES `equipamentos` (`id`);

--
-- Restrições para tabelas `pecas_substituidas`
--
ALTER TABLE `pecas_substituidas`
  ADD CONSTRAINT `pecas_substituidas_ibfk_1` FOREIGN KEY (`ordem_servico_id`) REFERENCES `ordens_servico` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
