## Student
- Name: Джаваншірі Кіян
- Group: 232/1 оф
 
## Практичне заняття №7 — Redis + Pagination + Filtering
 
### Запуск проекту
```bash
cp .env.example .env
docker compose up --build
docker compose run --rm app npm run seed
```
 
### API: GET /api/products
 
| Параметр | Тип | Default | Опис |
|----------|-----|---------|------|
| page | number | 1 | Номер сторінки |
| pageSize | number | 10 | Елементів на сторінку (max 100) |
| sort | string | createdAt | Поле сортування |
| order | asc/desc | desc | Напрямок |
| categoryId | number | - | Фільтр за категорією |
| minPrice | number | - | Мінімальна ціна |
| maxPrice | number | - | Максимальна ціна |
| search | string | - | Пошук за назвою (ILIKE) |
 
### Тест пагінації
```text
<вивід curl GET /api/products?page=1&pageSize=5>
{"data":{"items":[{"id":9,"name":"iPad Air","description":null,"price":"599.00","stock":30,"isActive":true,"category":{"id":1,"name":"Electronics","description":"Gadgets and devices","createdAt":"2026-04-05T15:10:02.065Z"},"createdAt":"2026-05-13T07:51:45.801Z","updatedAt":"2026-05-13T07:51:45.801Z"},{"id":8,"name":"MacBook Pro","description":null,"price":"2499.00","stock":15,"isActive":true,"category":{"id":1,"name":"Electronics","description":"Gadgets and devices","createdAt":"2026-04-05T15:10:02.065Z"},"createdAt":"2026-05-13T07:51:45.799Z","updatedAt":"2026-05-13T07:51:45.799Z"},{"id":7,"name":"Galaxy S24","description":null,"price":"849.00","stock":40,"isActive":true,"category":{"id":1,"name":"Electronics","description":"Gadgets and devices","createdAt":"2026-04-05T15:10:02.065Z"},"createdAt":"2026-05-13T07:51:45.797Z","updatedAt":"2026-05-13T07:51:45.797Z"},{"id":6,"name":"iPhone 16","description":null,"price":"999.00","stock":50,"isActive":true,"category":{"id":1,"name":"Electronics","description":"Gadgets and devices","createdAt":"2026-04-05T15:10:02.065Z"},"createdAt":"2026-05-13T07:51:45.790Z","updatedAt":"2026-05-13T07:51:45.790Z"},{"id":5,"name":"MacBook Air M4","description":null,"price":"1299.99","stock":25,"isActive":true,"category":null,"createdAt":"2026-05-04T14:16:04.074Z","updatedAt":"2026-05-04T14:16:04.074Z"}],"meta":{"page":1,"pageSize":5,"total":7,"totalPages":2}},"statusCode":200,"timestamp":"2026-05-13T08:00:29.247Z"}
```
 
### Тест фільтрації
```text
<вивід curl GET /api/products?categoryId=1&minPrice=500>
{"data":{"items":[{"id":9,"name":"iPad Air","description":null,"price":"599.00","stock":30,"isActive":true,"category":{"id":1,"name":"Electronics","description":"Gadgets and devices","createdAt":"2026-04-05T15:10:02.065Z"},"createdAt":"2026-05-13T07:51:45.801Z","updatedAt":"2026-05-13T07:51:45.801Z"},{"id":8,"name":"MacBook Pro","description":null,"price":"2499.00","stock":15,"isActive":true,"category":{"id":1,"name":"Electronics","description":"Gadgets and devices","createdAt":"2026-04-05T15:10:02.065Z"},"createdAt":"2026-05-13T07:51:45.799Z","updatedAt":"2026-05-13T07:51:45.799Z"},{"id":7,"name":"Galaxy S24","description":null,"price":"849.00","stock":40,"isActive":true,"category":{"id":1,"name":"Electronics","description":"Gadgets and devices","createdAt":"2026-04-05T15:10:02.065Z"},"createdAt":"2026-05-13T07:51:45.797Z","updatedAt":"2026-05-13T07:51:45.797Z"},{"id":6,"name":"iPhone 16","description":null,"price":"999.00","stock":50,"isActive":true,"category":{"id":1,"name":"Electronics","description":"Gadgets and devices","createdAt":"2026-04-05T15:10:02.065Z"},"createdAt":"2026-05-13T07:51:45.790Z","updatedAt":"2026-05-13T07:51:45.790Z"},{"id":3,"name":"iPhone 16","description":null,"price":"999.99","stock":50,"isActive":true,"category":{"id":1,"name":"Electronics","description":"Gadgets and devices","createdAt":"2026-04-05T15:10:02.065Z"},"createdAt":"2026-04-16T06:26:51.332Z","updatedAt":"2026-04-16T06:26:51.332Z"}],"meta":{"page":1,"pageSize":10,"total":5,"totalPages":1}},"statusCode":200,"timestamp":"2026-05-13T08:02:18.350Z"}
```
 
### Тест пошуку
```text
<вивід curl GET /api/products?search=mac>
{"data":{"items":[{"id":8,"name":"MacBook Pro","description":null,"price":"2499.00","stock":15,"isActive":true,"category":{"id":1,"name":"Electronics","description":"Gadgets and devices","createdAt":"2026-04-05T15:10:02.065Z"},"createdAt":"2026-05-13T07:51:45.799Z","updatedAt":"2026-05-13T07:51:45.799Z"},{"id":5,"name":"MacBook Air M4","description":null,"price":"1299.99","stock":25,"isActive":true,"category":null,"createdAt":"2026-05-04T14:16:04.074Z","updatedAt":"2026-05-04T14:16:04.074Z"},{"id":4,"name":"MacBook Pro","description":null,"price":"2499.99","stock":10,"isActive":true,"category":null,"createdAt":"2026-04-26T12:54:50.572Z","updatedAt":"2026-04-26T12:54:50.572Z"}],"meta":{"page":1,"pageSize":10,"total":3,"totalPages":1}},"statusCode":200,"timestamp":"2026-05-13T08:02:39.257Z"}
```
 
### Тест кешування (Redis)
```text
<вивід docker compose exec redis redis-cli KEYS "products:*">
products:{"page":1,"pageSize":10,"sort":"createdAt","order":"desc"}
```
 
### Тест інвалідації кешу
```text
<Redis KEYS до та після POST /api/products>
```
