# MARKETPLACE - CRIADOR DE ESTRUTURA AUTOMÁTICA

Write-Host "Criando estrutura do Marketplace..." -ForegroundColor Green

# FRONTEND
New-Item -ItemType Directory -Force frontend/public/banners
New-Item -ItemType Directory -Force frontend/src/assets/images
New-Item -ItemType Directory -Force frontend/src/assets/icons
New-Item -ItemType Directory -Force frontend/src/assets/styles

# COMPONENTES
New-Item -ItemType Directory -Force frontend/src/components/common
New-Item -ItemType Directory -Force frontend/src/components/layout
New-Item -ItemType Directory -Force frontend/src/components/home
New-Item -ItemType Directory -Force frontend/src/components/product
New-Item -ItemType Directory -Force frontend/src/components/cart
New-Item -ItemType Directory -Force frontend/src/components/auth
New-Item -ItemType Directory -Force frontend/src/components/admin

# PAGES
New-Item -ItemType Directory -Force frontend/src/pages
New-Item -ItemType Directory -Force frontend/src/routes
New-Item -ItemType Directory -Force frontend/src/services
New-Item -ItemType Directory -Force frontend/src/hooks
New-Item -ItemType Directory -Force frontend/src/context
New-Item -ItemType Directory -Force frontend/src/utils

# BACKEND
New-Item -ItemType Directory -Force backend/src/config
New-Item -ItemType Directory -Force backend/src/controllers
New-Item -ItemType Directory -Force backend/src/routes
New-Item -ItemType Directory -Force backend/src/middlewares
New-Item -ItemType Directory -Force backend/src/models
New-Item -ItemType Directory -Force backend/src/services
New-Item -ItemType Directory -Force backend/src/utils

# DATABASE
New-Item -ItemType Directory -Force database/migrations

# DOCS
New-Item -ItemType Directory -Force docs

# ARQUIVOS BASE
New-Item frontend/src/App.jsx -Force
New-Item frontend/src/main.jsx -Force
New-Item frontend/src/index.css -Force

New-Item backend/src/app.js -Force
New-Item backend/src/server.js -Force

New-Item .gitignore -Force
New-Item README.md -Force
New-Item package.json -Force

Write-Host "Estrutura criada com sucesso!" -ForegroundColor Cyan