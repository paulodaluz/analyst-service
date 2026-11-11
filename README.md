# Analyst Service

API NestJS para cadastrar, consultar, atualizar e excluir registros de analistas, incluindo endereço e contato, com persistência MongoDB via Mongoose. A aplicação publica documentação Swagger e utiliza DTOs para validar requisições. O README descreve a implementação atual e suas dependências de configuração.

[![Node.js](https://img.shields.io/badge/Node.js-22.11.0-339933?logo=node.js&logoColor=white)](https://nodejs.org/) [![NestJS](https://img.shields.io/badge/NestJS-10.x-E0234E?logo=nestjs)](https://docs.nestjs.com/) [![Licença](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

## 📋 Table of contents

- [✨ Features](#features)
- [🧪 Technologies](#technologies)
- [🛠️ Environment setup](#environment-setup)
- [🚀 Getting started](#getting-started)
- [🐋 Getting started with Docker](#docker)
- [🔌 API usage](#api-usage)
- [🗂️ Project structure](#project-structure)
- [✅ Testing and quality](#testing-and-quality)
- [🔎 Troubleshooting](#troubleshooting)
- [🤝 Contributing](#contributing)
- [📜 License](#license)

<a id="features"></a>

## ✨ Features

- Cadastro de analistas com UUID gerado pelo schema.
- Consulta, alteração parcial e exclusão por UUID.
- Validação de campos de perfil, endereço (`adress`) e contato.
- Persistência na coleção do model Mongoose `Analyst`.
- Documentação Swagger em `/swagger`.

Não há mecanismo de autenticação ou endpoint de saúde implementado. O nome do campo `adress`, com essa grafia, faz parte do contrato atual.

<a id="technologies"></a>

## 🧪 Technologies

As versões abaixo são declarações do `package.json`; `package-lock.json` fixa as resoluções da instalação.

| Tecnologia | Versão declarada | Uso |
| --- | --- | --- |
| [Node.js](https://nodejs.org/) | `22.11.0` | Runtime, também configurado na CI |
| [NestJS](https://docs.nestjs.com/) | `^10.0.0` | HTTP, módulos e injeção |
| [TypeScript](https://www.typescriptlang.org/docs/) | `^5.1.3` | Compilação |
| [Mongoose](https://mongoosejs.com/docs/) | `^8.8.0` | Conexão e operações MongoDB |
| [Swagger para NestJS](https://docs.nestjs.com/openapi/introduction) | `^8.0.2` | Documentação OpenAPI |
| [class-validator](https://github.com/typestack/class-validator) | `^0.14.1` | DTOs de entrada |
| [Jest](https://jestjs.io/docs/getting-started) | `^29.5.0` | Testes |

O workflow `.github/workflows/pipeline.yaml` instala dependências, compila, executa build, testes e lint em `main` e pull requests.

<a id="environment-setup"></a>

## 🛠️ Environment setup

Requer Git, Node.js 22.11.0 e um MongoDB de desenvolvimento autorizado.

```bash
nvm install 22.11.0
nvm use 22.11.0
git clone https://github.com/paulodaluz/analyst-service.git
cd analyst-service
npm ci
```

O guia utiliza npm porque há `package-lock.json` e a CI/Dockerfile também usam npm. Não há Husky, hooks ou `prepare`; o Nest CLI é dependência local.

| Configuração | Fonte | Uso |
| --- | --- | --- |
| `PORT` | Ambiente do processo | Opcional; padrão HTTP `3000` |
| `HOST` | Ambiente do processo | Opcional; padrão `0.0.0.0` |
| URI MongoDB | `src/database/database.providers.ts` | Fixa no código, obrigatória para inicializar o provider |

O código não carrega `.env` nem lê `MONGODB_URI`. A URI versionada contém configuração de um serviço externo e não é reproduzida aqui. Para um ambiente próprio, é necessário preparar uma conexão isolada em `database.providers.ts` ou parametrizá-la em uma alteração de código separada. Exemplo **fictício** de URI: `mongodb://127.0.0.1:27017/analyst_dev`. Nenhuma conexão ou credencial foi alterada nesta entrega de documentação.

<a id="getting-started"></a>

## 🚀 Getting started

Depois de configurar o banco de desenvolvimento:

```bash
npm run start:dev
```

A URL base padrão é `http://localhost:3000/analyst-service/v1`. O Swagger fica em `http://localhost:3000/swagger`, fora do prefixo global. A aplicação aguarda a inicialização do provider MongoDB antes de escutar HTTP.

```bash
# Verificação da resposta HTTP do Swagger, após configurar o banco
curl -I http://localhost:3000/swagger

# Build e execução da saída compilada
npm run build
npm run start:prod
```

O build validado produz `dist/src/main.js` (e uma cópia de `package.json` em `dist/`), enquanto `start:prod` tenta executar `dist/main`. Por isso, o script atualmente falha com `MODULE_NOT_FOUND`. A correção do caminho de produção ficou pendente. Após preparar um banco de testes e revisar essa divergência, o arquivo efetivamente emitido pode ser iniciado com `node dist/src/main.js`; esse caminho não foi executado contra o banco externo nesta tarefa. `PORT=4100 npm run start:dev`, por exemplo, solicita uma porta temporária sem alterar o padrão 3000. Encerre o processo com Ctrl+C. A resposta do Swagger não comprova o funcionamento do CRUD.

<a id="docker"></a>

## 🐋 Getting started with Docker

O Dockerfile usa `node:alpine`, copia o contexto inteiro para `/app`, instala dependências, compila e inicia `npm start`. Os comandos abaixo foram elaborados por inspeção e **não foram validados por execução nesta tarefa**.

```bash
# Na raiz, após preparar uma configuração de desenvolvimento sem segredos
docker build -t analyst-service .
docker run --rm --name analyst-service -e PORT=3000 -p 3000:3000 analyst-service
```

Não há Compose, volumes ou serviço MongoDB no Dockerfile. O container ainda depende do banco configurado no código. `EXPOSE 3001` diverge da porta padrão HTTP `3000`; `EXPOSE` não muda a escuta, por isso o mapeamento acima explicita 3000. A imagem `node:alpine` não fixa Node 22.11.0 e pode divergir do ambiente documentado.

Não há `.dockerignore`. O `COPY .` inclui os arquivos do contexto, inclusive configuração de conexão; prepare um contexto sem credenciais antes de qualquer build e não distribua uma imagem contendo segredos. A correção do empacotamento ficou pendente.

<a id="api-usage"></a>

## 🔌 API usage

Todas as rotas de dados usam o prefixo `/analyst-service/v1`. Não há token de autenticação. Use somente dados fictícios em um banco de testes.

| Método | Rota relativa | Resultado |
| --- | --- | --- |
| POST | `/users` | Cadastra e retorna `{ "uuid": "..." }`, status 200 |
| GET | `/users/:id` | Consulta um analista; UUID exigido |
| PUT | `/users/:id` | Atualiza campos fornecidos; corpo vazio é rejeitado |
| DELETE | `/users/:id` | Exclui o registro identificado |

```bash
curl -X POST http://localhost:3000/analyst-service/v1/users   -H 'Content-Type: application/json'   -d '{
    "fullname":"Pessoa de Exemplo",
    "birthDay":"01/01/2000",
    "documentNumber":"DOCUMENTO_FICTICIO",
    "gender":"example",
    "adress":{"street":"Rua Exemplo","number":100,"city":"Cidade Exemplo","state":"XX","postalCode":"00000-000"},
    "contact":{"phone":"00000000000","email":"usuario@example.com","contactPreference":"email"}
  }'

curl http://localhost:3000/analyst-service/v1/users/UUID_RETORNADO_NO_CADASTRO
```

`CreateAnalystDto`, `UpdateAnalystAnalystDto` e os DTOs aninhados definem os campos e tipos. A validação do parâmetro usa `IsUUID`; substitua o placeholder da consulta por um UUID retornado pelo cadastro. As operações de alteração/exclusão afetam o banco, portanto não use um ambiente de produção para testar esses exemplos.

<a id="project-structure"></a>

## 🗂️ Project structure

| Caminho | Responsabilidade |
| --- | --- |
| `src/main.ts` | Porta, host, prefixo e Swagger |
| `src/app.module.ts` | Controllers, serviços, repositório e providers |
| `src/controllers/` | Endpoints HTTP |
| `src/services/` | Regras de consulta e alteração |
| `src/repository/` | Operações Mongoose |
| `src/database/` | Conexão MongoDB e model |
| `src/schemas/` | Schema persistido |
| `src/validators/` | DTOs e pipe de validação |
| `src/entity/`, `src/interfaces/` | Contratos de dados e respostas |
| `test/unit/`, `test/mock/` | Suítes e dados de apoio |
| `.github/workflows/` | CI |

<a id="testing-and-quality"></a>

## ✅ Testing and quality

| Comando | Finalidade |
| --- | --- |
| `npm run build` | Compilação com Nest CLI |
| `npm test` | Jest serial, detecção de handles e saída forçada |
| `npm run test:watch` / `npm run test:cov` | Observação / cobertura |
| `npm run lint` | ESLint com `--fix` |
| `npm run format` | Prettier com escrita |
| `npm run start:debug` / `npm run test:debug` | Depuração |

`test:e2e` referencia `test/jest-e2e.json`, que não existe. A suíte de controller importa `AppModule` e tenta inicializar o provider MongoDB; ela não é independente de infraestrutura. Serviço e utilitário usam testes separados.

Validação com **Node.js 22.11.0 e npm 10.9.0**: `npm ci` e `npm run build` concluídos. `npm test -- --silent` retornou 13 testes aprovados e 5 falhas na suíte de controller, cujo hook de inicialização de `AppModule` excedeu 5000 ms ao aguardar o provider MongoDB. `npm run start:prod` falhou com `MODULE_NOT_FOUND` porque procura `dist/main`, enquanto o build gerou `dist/src/main.js`. Nenhum CRUD foi validado. Lint e formatação com escrita não foram executados.

A aplicação e o CRUD não foram validados contra um banco de desenvolvimento. A captura real do VS Code ficou pendente porque não foi possível verificar a instalação atual do usuário e seus temas.

<a id="troubleshooting"></a>

## 🔎 Troubleshooting

| Situação | Verificação |
| --- | --- |
| Inicialização parada ou falha de conexão | O provider aguarda MongoDB; a URI é fixa no código e não há override por `.env`. |
| 404 na raiz ou em `/users` | Use o prefixo `/analyst-service/v1`; Swagger usa `/swagger`. |
| 400 em `:id` | O identificador deve ser UUID válido. |
| 400 no corpo | Confira os DTOs e a grafia `adress`; updates vazios não são aceitos. |
| Testes de controller excedem timeout | Eles inicializam `AppModule` com provider real de banco; isolamento dessa suíte está pendente. |
| `start:prod` não encontra `dist/main` | O build observado emite `dist/src/main.js`; alinhar o script é uma correção pendente. |
| Container sem acesso HTTP | Mapeie a porta de `PORT`/padrão 3000; `EXPOSE 3001` não define a porta do servidor. |

<a id="contributing"></a>

## 🤝 Contributing

Crie uma branch a partir de `main`, mantenha as instruções consistentes com o código e abra um pull request descrevendo a alteração e suas verificações. Não versione credenciais, arquivos de ambiente privados, dependências instaladas ou artefatos de execução. Valide build e testes apropriados em banco isolado; revise alterações produzidas por lint/format antes do commit.

<a id="license"></a>

## 📜 License

Foi adicionada a [licença MIT](LICENSE), atribuída a Paulo da Luz em 2026. Antes desta documentação não existia licença concedendo direitos de uso. `package.json` e `package-lock.json` ainda contêm `UNLICENSED`; a atualização desses metadados ficou como pendência separada, preservando o escopo desta entrega.

---

<p align="center">Made with 💜 by <a href="https://github.com/paulodaluz">Paulo da Luz</a></p>
