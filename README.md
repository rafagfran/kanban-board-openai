# Kanban Board Project

Projeto de Kanban board com backend em **NestJS** e frontend em **Angular**. Permite criar, atualizar e deletar cards e columns. Conta também com um chatbot integrado a openAi possibilitando automatizaçôes

## Link de acesso web
![Acesse o projeto](https://asdjadlas.com)

## 🚀 Como rodar localmente

### Backend
```bash
cd backend
npm install
npx prisma generate
npm run start:dev
```

Executar testes unitários:
```bash
cd backend
npm run test

```
### Frontend
```bash
cd frontend
npm install
ng serve
```

## 📂 Estrutura do Projeto

backend/ # NestJS
  src/
    modules/
    common/
    database/

frontend/ # Angular
  src/
    app/
    components/
    pages/

    ## 🛠 Tecnologias

- **Backend:** NestJS, Prisma, SQLite, Jest, OpenAi
- **Frontend:** Angular, TypeScript, SCSS

## ⚡ Funcionalidades

---

- Criar, atualizar e deletar **cards**  
- Criar, atualizar e deletar **columns**  
- Automações via chatbot
- Testes unitários com Jest  

---

📦 Endpoints Principais
| Método | Endpoint     | Descrição       |
| ------ | ------------ | --------------- |
| POST   | /cards       | Cria um card    |
| PATCH  | /cards/:id   | Atualiza card   |
| DELETE | /cards/:id   | Deleta card     |
| POST   | /columns     | Cria coluna     |
| PATCH  | /columns/:id | Atualiza coluna |
| DELETE | /columns/:id | Deleta coluna   |


## 🔧 Configurações

### Backend
- Crie um arquivo .env com variáveis API keys conforme o .env.example
- prisma/schema.prisma define o modelo do banco

### Frontend
- Crie um arquivo .env com a variavel de url do backend local conforme o .env.example

Para dúvidas entrar em contato via linkedin
https://www.linkedin.com/in/rafagfran/