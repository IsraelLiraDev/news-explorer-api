# News Explorer — API (back-end)

API REST do projeto final News Explorer (TripleTen). Node.js + Express + MongoDB.

**Domínio público da API:** _(preencher após o deploy, ex.: https://api.seudominio.com)_

## Rotas

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/signup` | não | Cria usuário (`email`, `password`, `name`) |
| POST | `/signin` | não | Retorna `{ token }` (JWT) |
| GET | `/users/me` | sim | E-mail e nome do usuário logado |
| GET | `/articles` | sim | Artigos salvos do usuário |
| POST | `/articles` | sim | Salva artigo (`keyword`, `title`, `text`, `date`, `source`, `link`, `image`) |
| DELETE | `/articles/:articleId` | sim | Remove um artigo (somente o dono) |

Rotas protegidas exigem o cabeçalho `Authorization: Bearer <token>`.

## Como rodar (desenvolvimento)

Requer Node 20+ e MongoDB rodando em `127.0.0.1:27017`.

```
npm install
npm run dev      # com hot reload, em http://localhost:3000
npm run lint
```

Em desenvolvimento não é necessário `.env`.

## Produção

Crie um `.env` **apenas no servidor** (veja `.env.example`) com `NODE_ENV=production`, `JWT_SECRET`, `MONGO_URL` e `ALLOWED_ORIGINS`, e rode `npm start` (por exemplo com PM2 atrás de Nginx com HTTPS).

## Logs

`logs/request.log` e `logs/error.log`, em JSON (fora do repositório).
