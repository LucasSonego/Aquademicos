## Documentação

#### Índice

- [Users](#Users)
- [Sessions](#Sessions)
- [School Classes](#School\ Classes)

---

### Users

---

#### Criar

**Dados:**

| Campo        | Tipo de dado | Requisitos                     | Obrigatório           |
| ------------ | ------------ | ------------------------------ | --------------------- |
| name         | String       | -                              | sim                   |
| email        | String       | Formato de e-mail (xxx@xxx.xx) | sim                   |
| password     | String       | Ao menos 6 caracteres          | sim                   |
| is_admin     | Boolean      | -                              | não                   |
| admin_secret | String       | -                              | se `is_admin == true` |

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
**401**: Chave de cadastro de orientador incorreta

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

#### Editar (orientador)

**Dados:**

| Campo    | Tipo de dado | Requisitos                    | Obrigatório |
| -------- | ------------ | ----------------------------- | ----------- |
| id       | String       | -                             | sim         |
| name     | String       | -                             | não         |
| email    | String       | Formato de email (xxx@xxx.xx) | não         |
| password | String       | Ao menos 6 caracteres         | não         |

**Requisição:**

Método: PUT
Rota: /admin/users
(Usuário deve estar autenticado e deve ser um orientador)

```json
{
  "id": "020374b6-3c1e-4723-b419-cd4a2d264697",
  "name": "New User Name",
  "email": "user1@mail.com",
  "password": "654321"
}
```

**Resposta:**

```json
{
  "id": "020374b6-3c1e-4723-b419-cd4a2d264697",
  "name": "New User Name",
  "email": "user1@mail.com",
  "created_at": "2021-08-17T17:17:22.402Z",
  "updated_at": "2021-08-18T04:33:17.461Z"
}
```

**Códigos de erros:**
**403**: Não é permitido alterar dados de outros orientadores
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

---

### School Classes

#### Criar

**Dados:**

| Campo | Tipo de dado | Requisitos | Obrigatório |
| ----- | ------------ | ---------- | ----------- |
| name  | String       | -          | sim         |

**Requisição:**

Método: POST
Rota: /school_classes
(Usuário deve estar autenticado e deve ser um orientador)

```json
{
  "name": "Turma 1",
}
```

**Resposta:**

```json
{
  "id": "9b4b494e-5c0e-4811-85e2-be14830d42e0",
  "name": "Turma 1",
  "created_at": "2021-08-20T20:08:59.169Z"
}
```

---



#### Listar (publico)

**Requisição:**

Método: GET
Rota: /school_classes_public

**Resposta:**

```json
[
  {
    "id": "9b4b494e-5c0e-4811-85e2-be14830d42e0",
    "name": "Turma 3"
  },
  {
    "id": "d01bb365-2c56-49e1-9303-17f1c39b3dfc",
    "name": "Turma 2"
  },
  {
    "id": "b18793a3-b670-4421-8667-69c98c97f1c6",
    "name": "Turma 1"
  }
]
```

*As turmas serão ordenadas com base na data em que foram criadas, da mais recente a mais antiga

---



#### Listar (orientador)

**Dados:**

| Campo       | Tipo de dado | Requisitos | Obrigatório |
| ----------- | ------------ | ---------- | ----------- |
| get_deleted | Boolean      | -          | não         |

**Requisições:**

Método: GET
Rota: /school_classes
(Usuário deve estar autenticado e deve ser um orientador)

```json
<URL_BASE>/school_classes
```

**Resposta:**

```json
[
  {
    "id": "b18793a3-b670-4421-8667-69c98c97f1c6",
    "name": "Turma 1",
    "created_at": "2021-08-20T05:08:22.366Z",
    "updated_at": "2021-08-20T05:08:22.366Z",
    "students": []
  },
  {
    "id": "d01bb365-2c56-49e1-9303-17f1c39b3dfc",
    "name": "Turma 2",
    "created_at": "2021-08-20T20:08:55.662Z",
    "updated_at": "2021-08-20T20:08:55.662Z",
    "students": [
      {
        "id": "020374b6-3c1e-4723-b419-cd4a2d264697",
        "name": "User 1",
        "email": "user@mail.com"
      },
      {
        "id": "fabee59b-8a67-4323-965d-0511e00b69a6",
        "name": "User 2",
        "email": "user2@mail.com"
      }
    ]
  }
]
```



```json
<URL_BASE>/school_classes?getDeleted=true
```

**Resposta:**

```json
[
  {
    "id": "9b4b494e-5c0e-4811-85e2-be14830d42e0",
    "name": "Turma 3",
    "created_at": "2021-08-20T05:09:23.636Z",
    "deleted_at": "2021-08-20T05:10:06.576Z",
    "deleted_by": {
      "id": "f1954211-1edb-47d3-8b12-b52b06334b71",
      "name": "Admin 1",
      "email": "admin@mail.com"
    }
  }
]
```

---



#### Deletar

**Dados:**

| Campo | Tipo de dado | Requisitos | Obrigatório |
| ----- | ------------ | ---------- | ----------- |
| id    | String       | -          | sim         |

**Requisição:**

Método: DELETE
Rota: /school_classes
(Usuário deve estar autenticado e deve ser um orientador)

```json
{
  "id": "9b4b494e-5c0e-4811-85e2-be14830d42e0"
}
```

**Resposta:**

```json
{
  "id": "9b4b494e-5c0e-4811-85e2-be14830d42e0",
  "name": "Turma 3",
  "created_at": "2021-08-20T05:09:23.636Z",
  "updated_at": "2021-08-21T22:00:03.574Z",
  "deleted_at": "2021-08-21T22:00:03.572Z",
  "deleted_by_id": "f1954211-1edb-47d3-8b12-b52b06334b71"
}
```

---



#### Restaurar

**Dados:**

| Campo | Tipo de dado | Requisitos | Obrigatório |
| ----- | ------------ | ---------- | ----------- |
| id    | String       | -          | sim         |

**Requisição:**

Método: PATCH
Rota: /school_classes
(Usuário deve estar autenticado e deve ser um orientador)

```json
{
  "id": "9b4b494e-5c0e-4811-85e2-be14830d42e0"
}
```

**Resposta:**

```json
{
  "id": "9b4b494e-5c0e-4811-85e2-be14830d42e0",
  "name": "Turma 3",
  "created_at": "2021-08-20T05:09:23.636Z",
  "updated_at": "2021-08-21T22:02:12.574Z",
  "deleted_at": null,
  "deleted_by_id": null
}
```

