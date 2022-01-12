## Documentação

#### Índice

- [Users](#Users)
- [Sessions](#Sessions)
- [School Classes](#School-Classes)
- [Lessons](#Lessons)
- [Class Lessons](#Class-Lessons)

---

### Users

#### Criar

**Dados:**

| Campo           | Tipo de dado | Requisitos                     | Obrigatório |
| --------------- | ------------ | ------------------------------ | ----------- |
| name            | String       | -                              | sim         |
| email           | String       | Formato de e-mail (xxx@xxx.xx) | sim         |
| password        | String       | Ao menos 6 caracteres          | sim         |
| school_class_id | String       | -                              | sim         |

**Requisição:**

Método: POST
Rota: /users

```json
{
  "name": "User Name",
  "email": "user@mail.com",
  "password": "123456",
  "school_class_id": "9b4b494e-5c0e-4811-85e2-be14830d42e0"
}
```

**Resposta:**

```json
{
  "id": "020374b6-3c1e-4723-b419-cd4a2d264697",
  "name": "User Name",
  "email": "user@mail.com",
  "school_class": {
    "id": "020374b6-3c1e-4723-b419-cd4a2d264697",
    "name": "Turma 1"
  },
  "created_at": "2021-08-17T17:17:22.402Z"
}
```

**Códigos de erros:**
**409**: Email já está cadastrado para outro usuário
**404**: Não existe nenhuma turma com este id

---



#### Buscar

**Dados:**

| Campo | Tipo de dado | Requisitos | Obrigatório |
| ----- | ------------ | ---------- | ----------- |
| id    | String       | -          | não         |
| all   | Boolean      | -          | não         |

**Requisições:**

Método: GET
Rota: /users
(Usuário deve estar autenticado)

_*Buscar dados do usuário logado_

```json
<URL_BASE>/users
```

**Resposta:**

```json
{
  "id": "020374b6-3c1e-4723-b419-cd4a2d264697",
  "name": "User 1",
  "email": "user@mail.com",
  "is_admin": false,
  "school_class": {
    "id": "9b4b494e-5c0e-4811-85e2-be14830d42e0",
    "name": "Turma 1"
  },	
  "created_at": "2021-08-17T17:17:22.402Z"
}
```

---



#### Editar

**Dados:**

| Campo        | Tipo de dado | Requisitos                    | Obrigatório           |
| ------------ | ------------ | ----------------------------- | --------------------- |
| name         | String       | -                             | não                   |
| email        | String       | Formato de email (xxx@xxx.xx) | não                   |
| password     | String       | Ao menos 6 caracteres         | não                   |
| old_password | String       | Senha antiga do usuário       | se `password != null` |

**Requisição:**

Método: PUT
Rota: /users
(Usuário deve estar autenticado)

```json
{
  "name": "New User Name",
  "email": "user1@mail.com",
  "password": "654321",
  "old_password": "123456"
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

---

### School Classes

#### Listar

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

### Lessons

#### Buscar

**Requisição:**

Método: GET
Rota: /lessons/`id`
(Usuário deve estar autenticado)

```xml
<URL_BASE>/lesosns/24f11f56-85d0-4acc-bfc7-a9f9d050b165
```

**Respostas:**

```json
{
  "id": "24f11f56-85d0-4acc-bfc7-a9f9d050b165",
  "title": "Aula 1",
  "description": "Esta é a aula 1",
  "text_content": "Mussum Ipsum, cacilds vidis litro abertis. Quem manda na minha terra sou euzis!",
  "video_url": "https://vimeo.com/123123123"
}

```

*O aluno pode ver apenas as aulas vinculadas a turma a qual ele faz parte.

**Códigos de erros:**
**404**: Não há nenhuma aula com este id

---

### Class Lessons

#### Listar

**Requisição:**

Método: GET
Rota: /class_lessons
(Usuário deve estar autenticado)

```xml
<URL_BASE>/class_lessons
```

**Resposta**: **Aulas da turma que este aluno está vinculado*

```json
[
  {
    "id": "24f11f56-85d0-4acc-bfc7-a9f9d050b165",
    "title": "Aula 1",
    "description": "Esta é a aula 1"
  },
  {
    "id": "fc6062fc-d79a-4767-8bd0-ade342d183f2",
    "title": "Aula 2",
    "public_at": "2021-10-15T00:00:00.000Z"
  }
]
```
