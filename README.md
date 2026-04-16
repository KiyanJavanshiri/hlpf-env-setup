## Student
- Name: Джаваншірі Кіян
- Group: 232/1 оф
 
## Практичне заняття №4 — DTO + class-validator + Pipes
 
### Структура репозиторію
```
.
├── src/
│   ├── categories/
│   │   ├── dto/
│   │   │   ├── create-category.dto.ts
│   │   │   └── update-category.dto.ts
│   │   ├── category.entity.ts
│   │   ├── categories.module.ts
│   │   ├── categories.service.ts
│   │   └── categories.controller.ts
│   ├── products/
│   │   ├── dto/
│   │   │   ├── create-product.dto.ts
│   │   │   └── update-product.dto.ts
│   │   ├── product.entity.ts
│   │   ├── products.module.ts
│   │   ├── products.service.ts
│   │   └── products.controller.ts
│   ├── common/
│   │   └── pipes/
│   │   	└── trim.pipe.ts
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
### Тест валідації — порожнє ім'я категорії
```text
<вивід curl POST /api/categories з {"name": ""}>
{"message":["name must be longer than or equal to 2 characters"],"error":"Bad Request","statusCode":400}
```
 
### Тест валідації — від'ємна ціна продукту
```text
<вивід curl POST /api/products з {"name": "Test", "price": -5}>
{"message":["price must not be less than 0.01"],"error":"Bad Request","statusCode":400}
```
 
### Тест валідації — зайве поле
```text
<вивід curl POST /api/categories з {"name": "Test", "isAdmin": true}>
{"message":["property isAdmin should not exist"],"error":"Bad Request","statusCode":400}
```
 
### Тест TrimPipe
```text
<вивід curl POST /api/categories з {"name": "  Trimmed  "}>
{"message":["name must be longer than or equal to 2 characters"],"error":"Bad Request","statusCode":400}
```
 
### Тест валідне створення продукту
```text
<вивід curl POST /api/products з валідними даними>
{"id":3,"name":"iPhone 16","description":null,"price":999.99,"stock":50,"isActive":true,"category":{"id":1},"createdAt":"2026-04-16T06:26:51.332Z","updatedAt":"2026-04-16T06:26:51.332Z"}
```
