# Firebase Cloud Functions + Firestore Test

Este projeto é um teste de implementaçào das funcionalidades do Firebase Cloud Functions e Firestore Test em um back-end Node.js.

**Considere a raíz do projeto o diretório functions**

## Necessário para rodar:

 - Node.js 18+
 - Java 11+ (Emulador do Firebase)

## Instalação

1. Clonar este repositório
2. Rodar `npm install`

## Rodar o servidor local

Sem watch:

 - `npm run serve`

Com watch (rodar em terminais separados):

 - `npm run build:watch`
 - `npm run emulator`

O comando `npm run emulator` precisa de um diretório lib criado (disponível após executar o build).

## Rodar os testes

Sem watch:

 - `npm run tests`

Com watch:

 - `npm run tests:watch`

## Para testar os endpoints

### Cadastro:

```
curl --location 'http://127.0.0.1:5001/teste-392c6/us-central1/setUser' \
--header 'Content-Type: application/json' \
--data '{
    "name": "user"
}'
```

### Leitora por id:

```
curl --location 'http://127.0.0.1:5001/teste-392c6/us-central1/getUser/1'
```

### Listar tudo:

```
curl --location 'http://127.0.0.1:5001/teste-392c6/us-central1/getUsers'
```

## Auto increment

Foi adicionado duas estratégias de auto increment para refinamento posterior.

As estratégias não funcionam em conjunto, sendo concorrentes.

### src/services/users/setUser.ts

Esta estratégia apenas cadastra o usuário com auto increment pelo onCreate.

### src/services/users/setUserAlternative.ts

Esta estratégia cadastra o usuário controlando por si só o auto increment.

## Para alterar

Altere o arquivo `src/routes/users/setUser.ts` importando na linha 2.

Exemplo: 

```
import {
  setUser as setUserService,
} from "../../services/users/setUser";

```
