````markdown
# Movie Watchlist API

A RESTful API built with NestJS, Prisma ORM, and PostgreSQL. Features JWT authentication, role guards, automated Vitest unit and E2E testing, and Docker containerization.

---

## Tech Stack

- Framework: NestJS (Node.js 22)
- Database: PostgreSQL 16
- ORM: Prisma ORM
- Authentication: Passport.js, @nestjs/jwt, bcrypt
- Validation: class-validator, class-transformer
- Testing: Vitest, Supertest
- Containerization: Docker, Docker Compose

---

## Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://postgres:postgrespassword@localhost:5432/movie_watchlist?schema=public"
JWT_SECRET="super-secret-jwt-key-change-in-production"
PORT=9000
```
````

---

## Run with Docker

1. Start the API and PostgreSQL containers:

```bash
docker compose up --build

```

2. Run database migrations:

```bash
docker compose exec api npx prisma migrate deploy

```

The server runs on `http://localhost:9000`.

---

## Run Locally

1. Install dependencies:

```bash
npm install

```

2. Generate Prisma Client and apply migrations:

```bash
npx prisma generate
npx prisma migrate dev

```

3. Start development server:

```bash
npm run start:dev

```

---

## Testing

Run unit tests:

```bash
npm run test

```

Run end-to-end tests:

```bash
npm run test:e2e

```

---

## API Endpoints

### Authentication

| Method | Endpoint         | Auth | Description                              |
| ------ | ---------------- | ---- | ---------------------------------------- |
| POST   | `/auth/register` | None | Register a user (`username`, `password`) |
| POST   | `/auth/login`    | None | Authenticate user and receive JWT        |

### Movies

| Method | Endpoint              | Auth   | Description                                      |
| ------ | --------------------- | ------ | ------------------------------------------------ |
| GET    | `/movies`             | Public | List movies (supports `?genre=` and `?watched=`) |
| GET    | `/movies/:id`         | Public | Retrieve a single movie by ID                    |
| POST   | `/movies`             | Bearer | Add a new movie                                  |
| PATCH  | `/movies/:id`         | Bearer | Update movie details                             |
| PATCH  | `/movies/:id/watched` | Bearer | Toggle watched status                            |
| DELETE | `/movies/:id`         | Bearer | Remove movie by ID                               |

---

## Example Requests

### Register User

```bash
curl -X POST http://localhost:9000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"bunhong","password":"password123"}'

```

### Login

```bash
curl -X POST http://localhost:9000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"bunhong","password":"password123"}'

```

### Add Movie

```bash
curl -X POST http://localhost:9000/movies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "title": "Interstellar",
    "genre": "Sci-Fi",
    "releaseYear": 2014,
    "director": "Christopher Nolan"
  }'

```

### Fetch Movies

```bash
curl -X GET http://localhost:9000/movies

```

---

## Project Structure

```text
my-movie/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── auth/
│   ├── movies/
│   ├── prisma/
│   ├── app.module.ts
│   └── main.ts
├── test/
│   └── app.e2e-spec.ts
├── Dockerfile
├── docker-compose.yml
└── package.json

```

```

<FollowUp label="Want to push the commits to GitHub and prepare your final submission link?" query="Show me the commands to push main to GitHub and prepare the repository submission link."/>

```
