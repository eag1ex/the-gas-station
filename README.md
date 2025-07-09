## Project: The Gas Station

NestJS TypeScript REST API

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
  "start": "npm run start:prod",                         // Default start (used by Heroku)
  "start:prod": "node dist/main",                        // Starts production build
  "start:local": "NODE_ENV=development nest start",      // Starts in local dev mode (no watch)
  "start:dev": "nest start --watch",                     // Local dev with auto-restart
  "start:local:prod": "NODE_ENV=production node dist/main.js", // Local prod-like start

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

  // tests are incomplete
  "test": "jest",
  "test:e2e": "NODE_ENV=test jest --config ./test/jest-e2e.json"
}
```

## Heroku config

Get familiar with the file: `heroku-setup-example.sh` it provides needed knowledge to deploy tp heroku.

**Config setting**

```sh
heroku config:set NODE_ENV=production
##heroku config:set DATABASE_URL=file:./dev.db

## or just run
heroku config:set $(cat .env.prod | xargs)
```

## Seed initial data

To add initial data to our database when project is deployed to production we can run the see command

```sh
# drop local db
npm run purge:db

# local
npm run seed

# production on heroku
heroku run "npm run seed"

```

## Common issues

- Im using SqLite **ephemeral filesystem db**, after heroku restarts the data is not persistent,
  which means if i execute `heroku run "npm run seed"` it will restart after that and data will be lost, we we need to include the seed part of the deployment to heroku >`"heroku-postbuild": "npm run build && && npm run seed",`< <- which is not how we do things on production, but for this test we will make exception..
