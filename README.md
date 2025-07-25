## The Gas Station - REST API

This is a RESTful API built for "The Gas Station". The API manages a collection of recipes, allowing users to create, read, update, and delete (CRUD) entries. It follows best practices for RESTful design and aims to be clean, consistent, and maintainable.

### How to run the project

```sh
# install all packages
npm i

# start
npm run dev

# start with watch
npm run dev:w

# build for production
npm run build

# purge database (check db file name!!)
npm run purge:db

# seed database
npm run seed

# deploy to heroku
## follow instruction under `Heroku config and deploy`
```

**The .env file:**

- project defaults to `.env` file set inside: `app.module.ts`
- create/rename `.env` file from `example.env`,
  - _tip_ run `npm run purge:db` it works with `dev.db` so leave as is.

### 📌 Project Description

The goal of this project is to implement a robust and standards-compliant REST API for managing recipe data. The API supports the following operations:

- Create a new recipe
- Retrieve all recipes or a specific recipe by ID
- Update an existing recipe
- Delete a recipe

All endpoints return JSON-formatted responses and are validated against strict input schemas. The system is designed to be lightweight, performant, and compatible with deployment platforms like Heroku.

---

### 🛠 Stack Used

- **Framework**: [NestJS](https://nestjs.com/) — A progressive Node.js framework for building efficient server-side applications.
- **Language**: TypeScript
- **Database**: SQLite — lightweight and file-based, suitable for local and simple production use.
- **ORM**: Prisma — modern TypeScript ORM for database access and schema management.
- **Deployment**: Heroku — used for hosting the deployed version of the API.
- **Validation**: class-validator / class-transformer — for validating request DTOs.
- **Static Assets**: ServeStaticModule — to serve lightweight static content at the base route.

---

### 🧱 Architecture

- **Modular Structure**: Organized into feature-based modules (e.g., `recipes` module) using NestJS's modular architecture.
- **Controller-Service Pattern**: Business logic is separated into services, while controllers handle routing and HTTP responses.
- **DTO Validation**: Incoming requests are validated via DTOs using declarative decorators.
- **Global Exception Handling**: Custom filters manage validation errors and response formatting.
- **Utility Layer**: Reusable helpers handle formatting and response wrapping.
- **Stateless API**: Follows REST principles including statelessness, uniform interface, and layered architecture.
- **Deployment-ready**: Includes scripts and configuration for Heroku deployment with Prisma database push and optional seeding.

---

### API Endpoints

---

### **\[POST] /recipes**

Create a new recipe

**Request Body:**

```json
{
  "title": "Tomato Soup",
  "making_time": "15 min",
  "serves": "5 people",
  "ingredients": "onion, tomato, seasoning, water",
  "cost": 450
}
```

**Success Response:**

```json
{
  "message": "Recipe successfully created!",
  "recipe": [
    {
      "id": 3,
      "title": "Tomato Soup",
      "making_time": "15 min",
      "serves": "5 people",
      "ingredients": "onion, tomato, seasoning, water",
      "cost": 450,
      "created_at": "2025-07-08T12:00:00.000Z",
      "updated_at": "2025-07-08T12:00:00.000Z"
    }
  ]
}
```

---

### **\[GET] /recipes**

Retrieve all recipes

**Success Response:**

```json
{
  "recipes": [
    {
      "id": 1,
      "title": "Chicken Curry",
      "making_time": "45 min",
      "serves": "4 people",
      "ingredients": "onion, chicken, seasoning",
      "cost": 1000
    },
    {
      "id": 2,
      "title": "Rice Omelette",
      "making_time": "30 min",
      "serves": "2 people",
      "ingredients": "onion, egg, seasoning, soy sauce",
      "cost": 700
    }
  ]
}
```

---

### **\[GET] /recipes/{id}**

Retrieve a recipe by ID.

**Success Response:**

```json
{
  "message": "Recipe details by id",
  "recipe": [
    {
      "id": 1,
      "title": "Chicken Curry",
      "making_time": "45 min",
      "serves": "4 people",
      "ingredients": "onion, chicken, seasoning",
      "cost": 1000
    }
  ]
}
```

---

### **\[PATCH] /recipes/{id}**

Update a recipe by ID

**Request Body:**

```json
{
  "title": "Spicy Chicken Curry",
  "making_time": "50 min",
  "serves": "5 people",
  "ingredients": "onion, chicken, chili, seasoning",
  "cost": 1100
}
```

**Success Response:**

```json
{
  "message": "Recipe successfully updated!",
  "recipe": [
    {
      "title": "Spicy Chicken Curry",
      "making_time": "50 min",
      "serves": "5 people",
      "ingredients": "onion, chicken, chili, seasoning",
      "cost": 1100
    }
  ]
}
```

---

### **\[DELETE] /recipes/{id}**

Delete a recipe by ID

**Success Response:**

```json
{
  "message": "Recipe successfully removed!"
}
```

**Failure Response:**

```json
{
  "message": "No recipe found"
}
```

---

## Migrating from `.sql` to SQLite (Prisma-Compatible)

This guide walks through how to migrate traditional `.sql` schema to SQLite-compatible format for Prisma.

---

### 1. Create the `prisma/` Directory

At your project root:

```bash
mkdir prisma
```

---

### 2. Create the `schema.prisma` File

Inside created `prisma/` directory, create file named `schema.prisma` with following boilerplate:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL") // from your .env file (e.g., file:./dev.db)
}
```

---

### 3. Prepare SQL File for SQLite

**Run the SQL converter script:**

```bash
bash create_sqlite_file.sh
```

This generates compatible file at:

```
## sql/create.sql
sql/create-sqlite.sql
```

---

### 4. Create SQLite Database

Run following to create SQLite database from your new `.sql` file:

```bash
sqlite3 prisma/dev.db < sql/create-sqlite.sql
```

---

### 5. Generate Prisma Schema from SQLite

Ensure your `.env` contains this line (relative to your `schema.prisma`):

```env
DATABASE_URL="file:./dev.db"
```

Now run:

```bash
npx prisma db pull

## or if you already have schema.prisma
# npx prisma db push --schema=prisma/schema.prisma
```

> This introspects your database and populates `schema.prisma` with matching Prisma models.

---

### 6. (Optional) Set Up Migrations

If you want to enable migrations:

```bash
npx prisma migrate dev --name init
npx prisma migrate deploy
```

---

### 7. Generate the Prisma Client

You must regenerate Prisma Client after every `db pull` or `migrate`:

```bash
npx prisma generate
```

This will update the generated client in:

```
./node_modules/@prisma/client
```

---

### Summary:

- `create_sqlite_file.sh` → converts original `.sql` to SQLite-compatible.
- `sqlite3 prisma/dev.db < sql/create-sqlite.sql` → creates the actual SQLite DB.
- `npx prisma db pull` → generates your `schema.prisma`.
- `npx prisma generate` → updates Prisma client to match your schema.

## Script execution order

```json
"scripts": {

    // --- Heroku Build lifecycle ---
  "build": "nest build", // Compiles to /dist
  "heroku-postbuild": "npm run build", // Runs after dependencies are installed

  // --- Prisma setup ---
  "postinstall": "npx prisma db push && npx prisma generate", // Ensures DB and client are ready

  // --- Start app ---
  "start:prod": "node dist/main",
  "start": "npm run start:prod"
  //  --- Heroku Build end ---





  // === Start scripts ===
  "start": "npm run prod",                         // Default start (used by Heroku)
  "start:prod": "node dist/main",                        // Starts production build
  "dev": "cross-env NODE_ENV=development nest start",      // Starts in local dev mode (no watch)
  "dev:w": "nest start --watch",                     // Local dev with auto-restart
  "prod": "cross-env NODE_ENV=production node dist/main.js", // Local prod-like start

  // === Build scripts ===
  "build": "nest build",                                 // Compiles the app
  "heroku-postbuild": "npm run build",                   // Heroku hook: builds app

  // === Prisma hooks ===
  "postinstall": "npx prisma db push && npx prisma generate", // Runs on Heroku and locally after install
  "generate:db": "npx prisma db push",                   // Manual DB push
  "generate:client": "npx prisma generate",              // Manual Prisma Client gen

  // === Dev tools ===
  "lint": "eslint 'src/**/*.ts'",
  "format": "prettier --write 'src/**/*.ts'",
}
```

## Heroku config and deploy

Get familiar with the file: `heroku-setup-example.sh` it provides needed knowledge to deploy tp heroku.

**Config setting**

```sh
heroku config:set NODE_ENV=production
##heroku config:set DATABASE_URL=file:./dev.db

## or just run
heroku config:set $(cat .env.prod | xargs)

## push to heroku if your cli is already setup, done!
git push heroku main
```

## Seed initial data

To add initial data to our database when project is deployed to production we can run the see command

```sh
# drop local db
npm run purge:db

# local
npm run seed

# production on heroku
## this approach doesnt work with ephemeral filesystem
heroku run "npm run seed"

```

## Troubleshooting

- Im using SqLite **ephemeral filesystem db**, after heroku restarts the data is not persistent,
  which means if i execute `heroku run "npm run seed"` it will restart, and after data will be lost, we need to include the as seed part of deployment to heroku >`"heroku-postbuild": "npm run build && npm run seed",`< <- which is not how we do things on production, but for this test we will make exception..
- The second test case fails because testing server takes too long to resolve static BASE_URL call
  - When using curl it only takes me around 2s without any vpn:

```sh
curl -o /dev/null -s -w "\nHTTP Code: %{http_code}\nTotal Time: %{time_total} sec\n" https://yourappname.herokuapp.com/

HTTP Code: 200
Total Time: 2.504240 sec

```
