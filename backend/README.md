# #Backend Controle Financeiro App
Backend para funcionamento de um cadastro de transações financeiras utilizando node js.

## Rotas

- `POST /api/v1/create-user`: Responsável pelo registro do usuário
```js
// Request(Authorization: Bearer <token>):
// Request(Body):
{
	 "login": "lsncwb@gmail.com",
	 "password": "teste123",
	 "email": "lsncwb@gmail.com",
	 "name": "Leonardo",
	 "birthDate": "20/12/1995"
  }
// Response: StatusCode: 200 (OK)
{
  "_id": "60ee52ca0093c9062884a4ec",
  "login": "lsncwb@gmail.com",
  "password": "aa1bf4646de67fd9086cf6c79007026c",
  "email": "lsncwb@gmail.com",
  "name": "Leonardo",
  "birthDate": "20/12/1995",
  "createdAt": "2021-07-14T02:58:18.110Z",
  "updatedAt": "2021-07-14T02:58:18.110Z"
}
```

- `POST /api/v1/create-user`: Responsável pela autenticação
```js
// Request(Authorization: Bearer <token>):
// Request(Body):
{
	 "login": "lsncwb@gmail.com",
	 "password": "teste123"
  }
// Response: StatusCode: 200 (OK)
{
  "auth": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWU1MmNhMDA5M2M5MDYyODg0YTRlYyIsImlhdCI6MTYyNjIzMTgyOX0.V-Q5rjlIlgMqMHSxnSHV_PfZnyUjREh9Dcyb5p6RRtM"
}
```

- `POST /api/v1/transaction`: Responsável pelo cadastro das transações
```js
// Request(Authorization: Bearer <token>):
// Request(Body):
{
	"name": "Leonardo2132222222",
	"documentNumber": "884.189.780-58",
	"income": "2000",
	"outflow": "1000",
	"description": "Entrada de envestimento!"
  }
// Response: StatusCode: 200 (OK)
{
  "_id": "60ee53bef28c4b1a94f40549",
  "name": "Leonardo2132222222",
  "documentNumber": "884.189.780-58",
  "income": "2000",
  "outflow": "1000",
  "description": "Entrada de envestimento!",
  "createdAt": "2021-07-14T03:02:22.721Z",
  "updatedAt": "2021-07-14T03:02:22.721Z"
}
```

- `GET /api/v1/transactions`: Responsável por buscar todas transações
```js
// Request(Authorization: Bearer <token>):
// Request(Query):
// Response: StatusCode: 200 (OK)
{
    "_id": "60ee3c2dd6cd2a2ec0832bb5",
    "name": "Leo",
    "documentNumber": "09596469901",
    "income": "1000",
    "outflow": "500",
    "description": "testando a aplicação",
    "createdAt": "2021-07-14T01:21:49.158Z",
    "updatedAt": "2021-07-14T01:21:49.158Z"
}
```

- `GET /api/v1/transaction-search/:id`: Responsável por buscar a respectiva na barra de pesquisa
```js
// Request(Authorization: Bearer <token>):
// Request(Query):
// Response: StatusCode: 200 (OK)
{
  "_id": "60ecea8f5eeb680e4468cd26",
  "name": "Leonardo21",
  "documentNumber": "884.189.780-58",
  "income": "2000",
  "outflow": "1000",
  "description": "Entrada de envestimento!",
  "createdAt": "2021-07-13T01:21:19.443Z",
  "updatedAt": "2021-07-13T01:21:19.443Z"
}
```

- `PUT /api/v1/transaction-update/:id`: Responsável por editar a transação
```js
// Request(Authorization: Bearer <token>):
// Request(Query):
// Response: StatusCode: 200 (OK)
{
	"name": "Leo",
	"documentNumber": "884.189.780-58",
	"income": "2000",
	"outflow": "1000",
	"description": "Entrada de envestimento!"
 }
```

- `DELETE /api/v1/transaction/:id`: Responsável por excluir a transação
```js
// Request(Authorization: Bearer <token>):
// Request(Query):
// Response: StatusCode: 200 (OK)
{
  "_id": "60eceaca49a7f12a84be61d5",
  "name": "Leo",
  "documentNumber": "884.189.780-58",
  "income": "2000",
  "outflow": "1000",
  "description": "Entrada de envestimento!",
  "createdAt": "2021-07-13T01:22:18.404Z",
  "updatedAt": "2021-07-13T01:25:14.561Z"
 }
 

## Execução
Para executar o projeto use:(Projeto rodando na porta http://localhost:3333)
```js
npm install
npm run dev
```
