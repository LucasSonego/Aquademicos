## Documentação

#### Índice

- [Users](#Users)

- [Sessions](#Sessions)

  

### Users

---

#### Criar

**Dados:**

| Campo    | Tipo de dado | Requisitos                     | Obrigatório |
| -------- | ------------ | ------------------------------ | ----------- |
| name     | String       | -                              | sim         |
| email    | String       | Formato de e-mail (xxx@xxx.xx) | sim         |
| password | String       | Ao menos 6 caracteres          | sim         |

**Requisição:**

Método: POST
Rota: /users

```json
{
  "name": "User Name",
  "email": "user@mail.com",
  "password": "123456"
}
```

**Resposta:**

```json
{
  "id": "020374b6-3c1e-4723-b419-cd4a2d264697",
  "name": "User Name",
  "email": "user@mail.com",
  "created_at": "2021-08-17T17:17:22.402Z"
}
```

**Códigos de erros:**
**409**: Email já está cadastrado para outro usuário

---

#### Buscar

**Dados:**

| Campo | Tipo de dado | Requisitos | Obrigatório |
| ----- | ------------ | ---------- | ----------- |
| id    | String       | -          | não         |

**Requisições:**

Método: GET
Rota: /users
(Usuário deve estar autenticado)

```
<URL_BASE>/users?id="020374b6-3c1e-4723-b419-cd4a2d264697"
```

**Resposta:**

```json
{
  "id": "020374b6-3c1e-4723-b419-cd4a2d264697",
  "name": "User Name",
  "email": "user@mail.com",
  "created_at": "2021-08-17T17:17:22.402Z"
}
```

**Códigos de erros:**
**404**: Não existe nenhum usuário com o id buscado



```json
<URL_BASE>/users
```

**Resposta:**

```json
[
  {
    "id": "020374b6-3c1e-4723-b419-cd4a2d264697",
    "name": "User Name",
    "email": "user@mail.com",
    "created_at": "2021-08-17T17:17:22.402Z"
  },
  {
    "id": "fabee59b-8a67-4323-965d-0511e00b69a6",
    "name": "user2",
    "email": "user2@mail.com",
    "created_at": "2021-08-17T03:04:46.899Z"
  },
]
```

---

#### Editar

**Dados:**

| Campo       | Tipo de dado | Requisitos                    | Obrigatório           |
| ----------- | ------------ | ----------------------------- | --------------------- |
| name        | String       | -                             | não                   |
| email       | String       | Formato de email (xxx@xxx.xx) | não                   |
| password    | String       | Ao menos 6 caracteres         | não                   |
| oldPassword | String       | Senha antiga do usuário       | se `password != null` |

**Requisição:**

Método: PUT
Rota: /users
(Usuário deve estar autenticado)

```json
{
  "name": "New User Name",
  "email": "user1@mail.com",
  "password": "654321",
  "oldPassword": "123456"
}
```

**Resposta:**

```json
{
  "id": "020374b6-3c1e-4723-b419-cd4a2d264697",
  "name": "New User Name",
  "email": "user1@mail.com"
}
```

**Códigos de erros:**
**401**: Senha antiga incorreta
**409**: Email já esta cadastrado para outro usuário



---

### Sessions

#### Login

**Dados:**

| Campo    | Tipo de dado | Requisitos                    | Obrigatório |
| -------- | ------------ | ----------------------------- | ----------- |
| email    | String       | Formato de email (xxx@xxx.xx) | sim         |
| password | String       | -                             | sim         |

**Requisição**
Método: POST,
Rota: /sessions

```json
{
  "email": "user@mail.com",
  "password": "123456"
}
```

**Resposta:**

```json
{
  "id": "020374b6-3c1e-4723-b419-cd4a2d264697",
  "name": "User Name",
  "email": "user@mail.com"
}
```

Serão criados 2 cookies, um contendo o *token*, que não poderá ser acessado com JavaScript, e outro "authenticated=true", que é acessível com JavaScript

**Códigos de erros:**
**401**: Usuário ou senha incorretos

---

#### Logout

**Requisição:**
Método: DELETE
Rota: /sessions
(Usuário deve estar autenticado)

```json
<URL_BASE>/sessions
```

**Resposta:**

Os cookies serão removidos e será retornado o código 200.

---

#### Renew

**Requisição:**
Método: GET
Rota: /sessions
(Usuário deve estar autenticado)

```json
<URL_BASE>/sessions
```

**Resposta:**

```json
{
  "id": "020374b6-3c1e-4723-b419-cd4a2d264697",
  "name": "User Name",
  "email": "user@mail.com"
}
```

Os cookies de autenticação serão atualizados.

**Códigos de erros:**
**401**: A sessão expirou

