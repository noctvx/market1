# MarketPlace

<img width="1097" height="630" alt="image" src="https://github.com/user-attachments/assets/b7f88fd3-6406-49b6-833a-abf9c02e40a6" />


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
