## Student
- Name: Джаваншірі Кіян
- Group: 232/1 оф
 
## Практичне заняття №2 — NestJS + PostgreSQL + Redis
 
## Структура репозиторію
```
.
├── src/              	# NestJS source code
├── Dockerfile
├── docker-compose.yml
├── .env.example      	# шаблон змінних оточення
└── README.md
```
 
## Запуск проекту
```bash
cp .env.example .env   # налаштувати значення
docker compose up --build
```
 
## Перевірка сервісів
```text
<вивід docker compose ps>
NAME                        IMAGE                COMMAND                  SERVICE    CREATED              STATUS                        PORTS
hlpf-env-setup-app-1        hlpf-env-setup-app   "docker-entrypoint.s…"   app        About a minute ago   Up 58 seconds                 0.0.0.0:3000->3000/tcp, [::]:3000->3000/tcp
hlpf-env-setup-postgres-1   postgres:16-alpine   "docker-entrypoint.s…"   postgres   About a minute ago   Up About a minute (healthy)   0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp
hlpf-env-setup-redis-1      redis:7-alpine       "docker-entrypoint.s…"   redis      About a minute ago   Up About a minute (healthy)   0.0.0.0:6379->6379/tcp, [::]:6379->6379/tcp
```
 
## Перевірка PostgreSQL
```text
<вивід docker compose exec postgres psql -U nestuser -d nestdb -c '\l'>
Name    |  Owner   | Encoding | Locale Provider |  Collate   |   Ctype    | ICU Locale | ICU Rules |   Access privileges
-----------+----------+----------+-----------------+------------+------------+------------+-----------+-----------------------
 nestdb    | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           |
 postgres  | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           |
 template0 | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | =c/nestuser          +
           |          |          |                 |            |            |            |           | nestuser=CTc/nestuser
 template1 | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | =c/nestuser          +
           |          |          |                 |            |            |            |           | nestuser=CTc/nestuser
(4 rows)
```
 
## Перевірка Redis
```text
<вивід docker compose exec redis redis-cli ping>
PONG
```
 
## Перевірка застосунку
```text
<вивід curl http://localhost:3000>
$ curl http://localhost:3000
Hello World!
```
 
## Логи NestJS (фрагмент)
```text
<вивід docker compose logs app (ключові рядки запуску)>
1. app-1  | [Nest] 29  - 03/26/2026, 3:04:39 PM     LOG [NestApplication] Nest application successfully started +2ms
2. [InstanceLoader] TypeOrmCoreModule dependencies initialized +65ms
```
