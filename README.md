## 🥘Sistema de Gestão de Inventário para Restaurantes

## ⚠️Problema:
Restaurantes enfrentam dificuldades para controlar estoque de ingredientes, evitando desperdícios e garantindo que pedidos possam ser atendidos.

## 📖Descrição do Problema:
O sistema deve permitir que restaurantes registrem ingredientes, controlem quantidades e alertem quando o estoque estiver baixo. Pedidos devem ser processados apenas se houver ingredientes suficientes.

## 💻Tecnologias
  - NodeJS
  - Typescript
  - Express
  - Prisma
  - MySQL
  - Docker

## 📁 Regras de Negócio:
  - Cadastro de Ingredientes:
    - Cada ingrediente deve ter uma quantidade mínima definida para alertas.
    - Ingredientes podem ter múltiplos fornecedores.
  - Controle de Pedidos:
    - Um pedido só pode ser aceito se houver ingredientes suficientes.
    - Pedidos devem reduzir automaticamente os ingredientes do estoque.
  - Notificações:
    - Enviar alerta quando um ingrediente atingir nível crítico.
    - Notificar automaticamente os fornecedores quando um pedido de reposição for gerado.
  - Relatórios e Auditoria:
    - Histórico de consumo de ingredientes deve ser mantido.
    - Gerar relatórios de desperdício e eficiência.
      
## ✅ Requisitos Funcionais:
  - Cadastro e gerenciamento de ingredientes.
  - Registro de pedidos.
  - Controle automático de estoque.
  - Geração de relatórios de consumo.
  - Notificações para estoque baixo.

## ⚠️ Requisitos Não Funcionais:
  - Banco de dados otimizado para grandes volumes de transações.
  - API escalável para integração com aplicativos de delivery.
  - Logs e auditoria para rastreamento de mudanças.
