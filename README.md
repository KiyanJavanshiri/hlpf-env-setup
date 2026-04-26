## Student
- Name: Джаваншірі Кіян
- Group: 232/1 оф
 
## Практичне заняття №5 — JWT Authentication + Guards + RBAC
 
### Структура репозиторію
```
.
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   │   ├── register.dto.ts
│   │   │   └── login.dto.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   └── auth.controller.ts
│   ├── users/
│   │   ├── user.entity.ts
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   ├── common/
│   │   ├── enums/
│   │   │   └── role.enum.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   └── roles.decorator.ts
│   │   └── pipes/
│   │   	└── trim.pipe.ts
│   ├── categories/ ...
│   ├── products/ ...
│   ├── migrations/
│   ├── data-source.ts
│   ├── main.ts
│   └── app.module.ts
├── Dockerfile
├── docker-compose.yml
└── README.md
```
 
### Запуск проекту
```bash
cp .env.example .env
docker compose up --build
```
 
### API Endpoints
| Method | URL | Auth | Role |
|--------|-----|------|------|
| POST | /auth/register | - | - |
| POST | /auth/login | - | - |
| GET | /api/categories | - | - |
| POST | /api/categories | JWT | admin |
| GET | /api/products | - | - |
| POST | /api/products | JWT | admin |
| PATCH | /api/products/:id | JWT | admin |
| DELETE | /api/products/:id | JWT | admin |
 
### Тест реєстрації
```text
<вивід curl POST /auth/register>
{"id":2,"email":"user@test.com","name":"Test User","role":"user","createdAt":"2026-04-26T12:48:45.779Z"}
```
 
### Тест логіну
```text
<вивід curl POST /auth/login>
{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoidXNlckB0ZXN0LmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzc3MjA3NzcwLCJleHAiOjE3NzcyMTEzNzB9.dMKcEpXGCZ4ZtBZJSxeR59LBMrz0naRvYEYtMvl9MNQ"}
```
 
### Тест 401 — запит без токена
```text
<вивід curl POST /api/products без Authorization>
{"message":"Missing authorization token","error":"Unauthorized","statusCode":401}
```
 
### Тест 403 — запит з роллю user
```text
<вивід curl POST /api/products з токеном user>
{"message":"Insufficient permissions","error":"Forbidden","statusCode":403}
```
 
### Тест успішного створення від admin
```text
<вивід curl POST /api/products з токеном admin>
{"id":4,"name":"MacBook Pro","description":null,"price":2499.99,"stock":10,"isActive":true,"category":null,"createdAt":"2026-04-26T12:54:50.572Z","updatedAt":"2026-04-26T12:54:50.572Z"}
```
