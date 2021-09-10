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

| Campo           | Tipo de dado | Requisitos                     | Obrigatório            |
| --------------- | ------------ | ------------------------------ | ---------------------- |
| name            | String       | -                              | sim                    |
| email           | String       | Formato de e-mail (xxx@xxx.xx) | sim                    |
| password        | String       | Ao menos 6 caracteres          | sim                    |
| is_admin        | Boolean      | -                              | não                    |
| admin_secret    | String       | -                              | se `is_admin == true`  |
| school_class_id | String       | -                              | se `is_admin == false` |

**Requisição:**

Método: POST
Rota: /users

**Cadastro de estudante*

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



**Cadastro de Orientador*

```json
{
  "name": "Admin Name",
  "email": "admin@mail.com",
  "password": "123456",
  "is_admin": true,
  "admin_secret": "adminsecret123"
}
```

**Resposta:**

```json
{
  "id": "f1954211-1edb-47d3-8b12-b52b06334b71",
  "name": "Admin Name",
  "email": "admin@mail.com",
  "is_admin": true,
  "created_at": "2021-08-20T15:36:52.402Z"
}
```



**Códigos de erros:**
**409**: Email já está cadastrado para outro usuário
**404**: Não existe nenhuma turma com este id
**401**: Chave de cadastro de orientador incorreta

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



_*Buscar dados de um usuário_

```json
<URL_BASE>/users?id="fabee59b-8a67-4323-965d-0511e00b69a6"
```

**Resposta:**

```json
{
  "id": "fabee59b-8a67-4323-965d-0511e00b69a6",
  "name": "User 2",
  "email": "user2@mail.com",
  "is_admin": false,
  "school_class": {
    "id": "9b4b494e-5c0e-4811-85e2-be14830d42e0",
    "name": "Turma 1"
  },
  "created_at": "2021-08-17T03:04:46.899Z"
}
```

**Códigos de erros:**
**404**: Não existe nenhum usuário com o id buscado



_*Listar todos os usuários_

```json
<URL_BASE>/users?all=true
```

**Resposta:**

```json
[
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
  },
  {
    "id": "fabee59b-8a67-4323-965d-0511e00b69a6",
    "name": "User 2",
    "email": "user2@mail.com",
    "is_admin": false,
    "school_class": {
      "id": "9b4b494e-5c0e-4811-85e2-be14830d42e0",
      "name": "Turma 1"
  	},	
    "created_at": "2021-08-17T03:04:46.899Z"
  },
]
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



#### Editar (orientador)

**Dados:**

| Campo           | Tipo de dado | Requisitos                    | Obrigatório |
| --------------- | ------------ | ----------------------------- | ----------- |
| id              | String       | -                             | sim         |
| name            | String       | -                             | não         |
| email           | String       | Formato de email (xxx@xxx.xx) | não         |
| password        | String       | Ao menos 6 caracteres         | não         |
| school_class_id | String       | -                             | não         |

**Requisição:**

Método: PUT
Rota: /admin/users
(Usuário deve estar autenticado e deve ser um orientador)

```json
{
  "id": "020374b6-3c1e-4723-b419-cd4a2d264697",
  "name": "New User Name",
  "email": "user1@mail.com",
  "password": "654321",
  "school_class_id": "9b4b494e-5c0e-4811-85e2-be14830d42e0"
}
```

**Resposta:**

```json
{
  "id": "020374b6-3c1e-4723-b419-cd4a2d264697",
  "name": "New User Name",
  "email": "user1@mail.com",
  "school_class": {
    "id": "9b4b494e-5c0e-4811-85e2-be14830d42e0",
    "name": "Turma 1"
  },
  "created_at": "2021-08-17T17:17:22.402Z",
  "updated_at": "2021-08-18T04:33:17.461Z"
}
```

**Códigos de erros:**
**403**: Não é permitido alterar dados de outros orientadores
**404**: Não existe nenhuma turma com este id
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
| name  | String       | único      | sim         |

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

**Códigos de erros:**
**409**: Já existe outra turma com este nome

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

#### Editar

**Dados:**

| Campo | Tipo de dado | Requisitos | Obrigatório |
| ----- | ------------ | ---------- | ----------- |
| name  | String       | -          | não         |

**Requisição:**

Método: PUT
Rota: /school_classes
(Usuário deve estar autenticado e deve ser um orientador)

```xml
<URL_BASE>/school_classes/9b4b494e-5c0e-4811-85e2-be14830d42e0
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

**Códigos de erros:**
**404**: Não há nenhuma turma com este id

---



#### Deletar

**Requisição:**

Método: DELETE
Rota: /school_classes
(Usuário deve estar autenticado e deve ser um orientador)

```xml
<URL_BASE>/school_classes/9b4b494e-5c0e-4811-85e2-be14830d42e0
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

**Códigos de erros:**
**404**: Não há nenhuma turma com este id

---



#### Restaurar

**Requisição:**

Método: PATCH
Rota: /school_classes
(Usuário deve estar autenticado e deve ser um orientador)

```xml
<URL_BASE>/school_classes/9b4b494e-5c0e-4811-85e2-be14830d42e0
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

**Códigos de erros:**
**404**: Não há nenhuma turma com este id

---



### Lessons

#### Criar

**Dados:**

| Campo       | Tipo de dado | Requisitos | Obrigatório |
| ----------- | ------------ | ---------- | ----------- |
| title       | String       | -          | sim         |
| description | String       | -          | sim         |
| textContent | String       | -          | sim         |
| videoUrl    | String       | URL        | sim         |

**Requisição:**

Método: POST
Rota: /lessons
(Usuário deve estar autenticado e deve ser um orientador)

```json
{
  "title": "Aula 1",
  "description": "Esta é a aula 1",
  "textContent": "Mussum Ipsum, cacilds vidis litro abertis. Quem manda na minha terra sou euzis!",
  "videoUrl": "https://vimeo.com/123123123"
}
```

**Resposta:**

```json
{
  "id": "24f11f56-85d0-4acc-bfc7-a9f9d050b165",
  "title": "Aula 1",
  "description": "Esta é a aula 1",
  "textContent": "Mussum Ipsum, cacilds vidis litro abertis. Quem manda na minha terra sou euzis!",
  "videoUrl": "https://vimeo.com/123123123"
}
```

---



#### Listar

**Requisição:**

Método: GET
Rota: /lessons
(Usuário deve estar autenticado e deve ser um orientador)

```xml
<URL_BASE>/lesosns
```

**Respostas:**

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
    "description": "Esta é a aula 2"
  }
]
```

---



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

*Os orientadores podem ver qualquer aula, e os alunos podem ver apenas as aulas vinculadas a turma a qual ele faz parte.

**Códigos de erros:**
**404**: Não há nenhuma aula com este id

---



#### Editar

**Dados:**

| Campo       | Tipo de dado | Requisitos | Obrigatório |
| ----------- | ------------ | ---------- | ----------- |
| title       | String       | -          | não         |
| description | String       | -          | não         |
| textContent | String       | -          | não         |
| videoUrl    | String       | URL        | não         |

**Requisição:**

Método: PUT
Rota: /lessons/`id`
(Usuário deve estar autenticado e deve ser um orientador)

```xml
<URL_BASE>/lessons/d14902e8-c4c9-4af6-aa67-6285ce6934d5
```

```json
{
  "title": "Aula 1",
  "description": "Esta é a aula 1",
  "textContent": "Mussum Ipsum, cacilds vidis litro abertis. Quem manda na minha terra sou euzis!",
  "videoUrl": "https://vimeo.com/123123123"
}
```

**Resposta:**

```json
{
  "id": "24f11f56-85d0-4acc-bfc7-a9f9d050b165",
  "title": "Aula 1",
  "description": "Esta é a aula 1",
  "textContent": "Mussum Ipsum, cacilds vidis litro abertis. Quem manda na minha terra sou euzis!",
  "videoUrl": "https://vimeo.com/123123123"
}
```

**Códigos de erros:**
**404**: Não há nenhuma aula com este id

---



#### Deletar

**Requisição:**

Método: DELETE
Rota: /lessons/`id` 
(Usuário deve estar autenticado e deve ser um orientador)

```xml
<URL_BASE>/lessons/24f11f56-85d0-4acc-bfc7-a9f9d050b165
```

**Resposta:**

```json
OK (200)
```

**Códigos de erros:**
**404**: Não há nenhuma aula com este id

---



### Class Lessons

#### Criar

**Dados:**

| Campo         | Tipo de Dado | Requisitos      | Obrigatório |
| ------------- | ------------ | --------------- | ----------- |
| lessonId      | String       | -               | sim         |
| schoolClassId | String       | -               | sim         |
| publicAt      | String       | ISO date string | não         |

**Requisição:**

Método: POST
Rota: /class_lessons
(Usuário deve estar autenticado e deve ser um orientador)

```json
{
  "lessonId": "24f11f56-85d0-4acc-bfc7-a9f9d050b165",
  "schoolClassId": "f5cb7356-6965-429f-981c-635367ce6716",
  "publicAt": "2021-09-09T22:45:00.000Z"
}
```

**Resposta:**

```json
{
  "id": "2fbe6bbe-9a48-4a48-8cf9-d316d8751177",
  "lesson_id": "24f11f56-85d0-4acc-bfc7-a9f9d050b165",
  "school_class_id": "f5cb7356-6965-429f-981c-635367ce6716",
  "public_at": "2021-09-09T22:45:00.000Z"
}
```

**Códigos de erros:**
**404**: Não há nenhuma aula com este id
**404**: Não há nenhuma turma com este id
**409**: Esta aula já existe nesta turma

*Caso o campo "publicAt" não seja enviado o valor de "publicAt" será a hora em que a requisição foi recebida

---



#### Listar

**Requisição:**

Método: GET
Rota: /class_lessons
(Usuário deve estar autenticado)

```xml
<URL_BASE>/class_lessons
```

**Resposta** (estudante): *O estudante receberá uma lista com as aulas vinculadas a turma a qual ele faz parte

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

**Resposta** (orientador): *O orientador receberá uma lista de turmas contendo as tarefas vinculadas a cada uma delas

```json
[ 
  {
    "id": "9b4b494e-5c0e-4811-85e2-be14830d42e0",
    "name": "Turma Y",
    "lessons": []
  },
  {
    "id": "f5cb7356-6965-429f-981c-635367ce6716",
    "name": "Turma X",
    "lessons": [
      {
        "id": "24f11f56-85d0-4acc-bfc7-a9f9d050b165",
        "title": "Aula 1",
        "description": "Esta é a aula 1",
        "text_content": "Mussum Ipsum, cacilds vidis litro abertis. Quem manda na minha terra sou euzis!",
        "video_url": "https://vimeo.com/123123123"
      },
      {
        "id": "fc6062fc-d79a-4767-8bd0-ade342d183f2",
        "title": "Aula 2",
        "description": "Esta é a aula 2",
        "text_content": "Mussum Ipsum, cacilds vidis litro abertis. Per aumento de cachacis, eu reclamis.",
        "video_url": "https://www.youtube.com/watch?v=example"
      }
    ]
  }
]
```



**Buscar aulas de uma turma**

```xml
<URL_BASE>/class_lessons?class="f5cb7356-6965-429f-981c-635367ce6716"
```

**Resposta:**

```json
[
  {
    "id": "2fbe6bbe-9a48-4a48-8cf9-d316d8751177",
    "lesson": {
      "id": "24f11f56-85d0-4acc-bfc7-a9f9d050b165",
      "title": "Aula 1",
      "description": "Esta é a aula 1",
      "text_content": "Mussum Ipsum, cacilds vidis litro abertis. Quem manda na minha terra sou euzis!",
      "video_url": "https://vimeo.com/123123123"
    },
    "school_class_id": "f5cb7356-6965-429f-981c-635367ce6716",
    "public_at": "2021-09-10T00:00:00.000Z"
  },
  {
    "id": "40530ea8-986a-46df-8c89-9c3ea1fa432c",
    "lesson": {
      "id": "fc6062fc-d79a-4767-8bd0-ade342d183f2",
      "title": "Aula 2",
      "description": "Esta é a aula 2",
      "text_content": "Mussum Ipsum, cacilds vidis litro abertis. Per aumento de cachacis, eu reclamis.",
      "video_url": "https://www.youtube.com/watch?v=example"
    },
    "school_class_id": "f5cb7356-6965-429f-981c-635367ce6716",
    "public_at": "2021-10-15T00:00:00.000Z"
  }
]
```

**Códigos de erros:**
**404**: Não há nenhuma turma com este id

---



#### Editar

**Dados:**

| Campo         | Tipo de Dado | Requisitos      | Obrigatório |
| ------------- | ------------ | --------------- | ----------- |
| lessonId      | String       | -               | sim         |
| schoolClassId | String       | -               | sim         |
| publicAt      | String       | ISO date string | não         |

**Requisição:**

Método: PUT
Rota: /class_lessons
(Usuário deve estar autenticado e deve ser um orientador)

```json
{
  "lessonId": "24f11f56-85d0-4acc-bfc7-a9f9d050b165",
  "schoolClassId": "f5cb7356-6965-429f-981c-635367ce6716",
  "publicAt": "2021-09-15T00:00:00.000Z"
}
```

**Resposta:**

```json
{
  "id": "2fbe6bbe-9a48-4a48-8cf9-d316d8751177",
  "lesson_id": "24f11f56-85d0-4acc-bfc7-a9f9d050b165",
  "school_class_id": "f5cb7356-6965-429f-981c-635367ce6716",
  "public_at": "2021-09-15T00:00:00.000Z"
}
```

**Códigos de erros:**
**404**: Não há nenhuma aula que corresponde com esses dados

---



#### Deletar

**Dados:**

| Campo         | Tipo de Dado | Requisitos | Obrigatório |
| ------------- | ------------ | ---------- | ----------- |
| lessonId      | String       | -          | sim         |
| schoolClassId | String       | -          | sim         |

Método: DELETE
Rota: /class_lessons
(Usuário deve estar autenticado e deve ser um orientador)

```json
{
  "lessonId": "24f11f56-85d0-4acc-bfc7-a9f9d050b165",
  "schoolClassId": "f5cb7356-6965-429f-981c-635367ce6716"
}
```

**Resposta:**

```json
OK (200)
```

**Códigos de erros:**
**404**: Não há nenhuma aula que corresponde com esses dados
