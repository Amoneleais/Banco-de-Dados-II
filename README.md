
# CRUD com API Rest em Express

#### Projeto da Disciplina Banco de Dados II




## Instalação

Instale a API com npm

```bash
  cd backend
  npm install
```

Instale o Front end com npm

```bash
  cd frontend
  npm install
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`MONGODB_URI`

A variável de ambiente deve ser inserida na pasta backend

## Inicializar projeto

Você pode optar por iniciar apenas o Back End para testes ou iniciar ambos Front e Back End utilizando o seguinte comando para os dois
```bash
  npm start
```
## Documentação da API

#### Insere um novo usuário

```http
  POST /api/users
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**. Nome do Usuário |
| `email` | `string` | **Obrigatório**. Email do Usuário |
| `cpf` | `string` | **Obrigatório**. Cadastro de Pessoas Físicas do Usuário|
| `nascimento` | `date` | **Obrigatório**. Data de Nascimento do Usuário |
| `cep` | `string` | **Obrigatório**. CEP do Usuário|
| `endereco` | `string` | **Obrigatório**. Endereço do Usuário |

* Ao inserir uma data, terá de ser feito utilizando modelo do seguinte exemplo:
```
                                "2003-06-17T08:30:00.000Z"
```

#### Retorna todos os usuários

```http
  GET /api/users
```
#### Retorna um usuário específico

```http
  GET /api/users/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `int` | **Obrigatório**. O ID do usuário que você quer buscar |

#### Atualiza um usuário específico
```http
  PATCH /api/users/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `int` | **Obrigatório**. O ID do usuário que você quer atualizar |
| `nome` | `string` | **Opcional**. Nome do Usuário |
| `email` | `string` | **Opcional**. Email do Usuário |
| `cpf` | `string` | **Opcional**. Cadastro de Pessoas Físicas do Usuário|
| `nascimento` | `date` | **Opcional**. Data de Nascimento do Usuário |
| `cep` | `string` | **Opcional**. CEP do Usuário|
| `endereco` | `string` | **Opcional**. Endereço do Usuário |

* A atualização pode ser feita apenas de um dado ou do documento inteiro.

#### Remove um usuário específico

```http
  GET /api/users/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `int` | **Obrigatório**. O ID do usuário que você quer remover |
