## Student

- Name: Джаваншірі Кіян
- Group: 232/1 оф

## Практичне заняття №3 — CRUD REST API для MiniShop

### Структура репозиторію

```
.
├── src/
│   ├── categories/
│   │   ├── category.entity.ts
│   │   ├── categories.module.ts
│   │   ├── categories.service.ts
│   │   └── categories.controller.ts
│   ├── products/
│   │   ├── product.entity.ts
│   │   ├── products.module.ts
│   │   ├── products.service.ts
│   │   └── products.controller.ts
│   ├── migrations/
│   │   ├── 1700000001-CreateTables.ts
│   │   └── <timestamp>-AddIsActiveToProducts.ts
│   ├── data-source.ts
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

| Method | URL                 | Опис               |
| ------ | ------------------- | ------------------ |
| GET    | /api/categories     | Список категорій   |
| GET    | /api/categories/:id | Одна категорія     |
| POST   | /api/categories     | Створити категорію |
| PATCH  | /api/categories/:id | Оновити категорію  |
| DELETE | /api/categories/:id | Видалити категорію |
| GET    | /api/products       | Список продуктів   |
| GET    | /api/products/:id   | Один продукт       |
| POST   | /api/products       | Створити продукт   |
| PATCH  | /api/products/:id   | Оновити продукт    |
| DELETE | /api/products/:id   | Видалити продукт   |

### Перевірка міграцій

```text
<вивід docker compose exec postgres psql -U nestuser -d nestdb -c "\dt">

List of relations
 Schema |    Name    | Type  |  Owner
--------+------------+-------+----------
 public | categories | table | nestuser
 public | migrations | table | nestuser
 public | products   | table | nestuser
```

### Тест створення категорії

```text
<вивід curl POST /api/categories>
1. POST /api/categories -> {"id":1,"name":"Electronics","description":"Gadgets and devices","createdAt":"2026-04-05T15:10:02.065Z"}

2. POST /api/categories 2 -> {"id":2,"name":"Accessories","description":null,"createdAt":"2026-04-05T15:10:27.728Z"}
```

### Тест створення продукту

```text
<вивід curl POST /api/products>

POST /api/products -> {"id":1,"name":"iPhone 15","description":null,"price":999.99,"stock":50,"isActive":true,"category":{"id":1},"createdAt":"2026-04-05T15:12:31.135Z","updatedAt":"2026-04-05T15:12:31.135Z"}
```

### Тест отримання продуктів

```text
<вивід curl GET /api/products>

GET /api/products -> [{"id":1,"name":"iPhone 15","description":null,"price":"999.99","stock":50,"isActive":true,"category":{"id":1,"name":"Electronics","description":"Gadgets and devices","createdAt":"2026-04-05T15:10:02.065Z"},"createdAt":"2026-04-05T15:12:31.135Z","updatedAt":"2026-04-05T15:12:31.135Z"},{"id":2,"name":"USB Cable","description":null,"price":"9.99","stock":200,"isActive":true,"category":null,"createdAt":"2026-04-05T15:12:53.400Z","updatedAt":"2026-04-05T15:12:53.400Z"}]
```

### Тест 404

```text
<вивід curl GET /api/products/999>

GET /api/products/999 -> {"message":"Product #999 not found","error":"Not Found","statusCode":404}
```
