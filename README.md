# MyBusBackend

A NodeJS backend application for save analyst register.

## 🧪 Tecnologias
As principais tecnologias utilizadas foram:
- [NodeJS](https://nodejs.org/en/)
- [NestJS](https://docs.nestjs.com/)
- [Typescript](https://www.typescriptlang.org/docs/)
- [MongoDB](https://www.mongodb.com)


## 🛠️ Configurando o ambiente
 - Use a versão 22.11.0 do nodeJS
 - Clone o repositório
 - Instale as dependências com `npm install` ou `yarn install`


## 🚀 Getting started
Para startar o projeto você pode digitar o comando `npm run start:dev` ou `yarn start:dev` no diretório do projeto.

Após isso ele irá abrir na porta `3000` no seu localhost, ou seja, basta apenas entrar em `localhost:3000/analyst-service/v1/ROTA_DESEJADA`.

Segue os CURL´s:

### Create Analyst
`curl --location 'localhost:3000/analyst-service/v1/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "fullname": "Paulo da Luz",
    "birthDay": "25/11/2000",
    "documentNumber": "146.434.650-00",
    "gender": "male",
    "adress": {
        "street": "Morom",
        "number": 2584,
        "city": "Porto Alegre",
        "state": "RS",
        "postalCode": "29931-140"
    },
    "contact": {
        "phone": "54991083039",
        "email": "rm353710@fiap.com.br",
        "contactPreference": "email"
    }
}'`

### GET Analyst
`curl --location 'localhost:3000/analyst-service/v1/users/998bcf68-cbfa-40f7-b5c1-0693c3dd90fb'`

### Update Analyst
`curl --location --request PUT 'localhost:3000/analyst-service/v1/users/5de67719-1da8-4857-96e8-630556dd3128' \
--header 'Content-Type: application/json' \
--data '{
    "fullname": "Paulo da Luzzzz"
}'`

### Delete Analyst
`curl --location --request DELETE 'localhost:3000/analyst-service/v1/users/5de67719-1da8-4857-96e8-630556dd3128'`


<p align="center">Made by Paulo da Luz</p>
