# MarketPlace

Aplicação marketplace com visual inspirado na Americanas. Permite cadastrar produtos à venda com backend em Node.js/Express e banco SQLite.

## Como usar

1. Execute `npm install` na raiz para instalar a dependência `concurrently`.
2. Rode `npm run install:all` para instalar backend e frontend.
3. Inicie a aplicação com `npm run dev`.

## Estrutura

- `backend/`: API Express e SQLite
- `frontend/`: App React com Vite
- `database/market.db`: arquivo do banco de dados SQLite criado automaticamente

## Rotas disponíveis

- `GET /api/items`
- `POST /api/items`
- `GET /api/items/:id`
- `PUT /api/items/:id`
- `DELETE /api/items/:id`
