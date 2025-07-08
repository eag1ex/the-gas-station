## Project: The Gas Station

Nest.js typescript /api project

### api calls

```json
POST /recipes
Content-Type: application/json

{
  "title": "Tomato Soup",
  "making_time": "15 min",
  "serves": "5 people",
  "ingredients": "onion, tomato, seasoning, water",
  "cost": 450
}


```

```json
// expected response
{
  "message": "Recipe successfully created!",
  "recipe": [
    {
      "id": "3",
      "title": "Tomato Soup",
      "making_time": "15 min",
      "serves": "5 people",
      "ingredients": "onion, tomato, seasoning, water",
      "cost": "450",
      "created_at": "2025-07-08 12:00:00",
      "updated_at": "2025-07-08 12:00:00"
    }
  ]
}
```

GET /recipes

```json
// Expected Response

{
  "recipes": [
    {
      "id": 1,
      "title": "Chicken Curry",
      "making_time": "45 min",
      "serves": "4 people",
      "ingredients": "onion, chicken, seasoning",
      "cost": "1000"
    },
    ...
  ]
}

```

GET /recipes/{id}

```json
// Expected Response:
{
  "message": "Recipe details by id",
  "recipe": [
    {
      "id": 1,
      "title": "Chicken Curry",
      "making_time": "45 min",
      "serves": "4 people",
      "ingredients": "onion, chicken, seasoning",
      "cost": "1000"
    }
  ]
}
```

PATCH /recipes/{id}

```
PATCH /recipes/1
Content-Type: application/json

{
  "title": "Spicy Chicken Curry",
  "making_time": "50 min",
  "serves": "5 people",
  "ingredients": "onion, chicken, chili, seasoning",
  "cost": 1100
}
```

```json
// Expected Response:
{
  "message": "Recipe successfully updated!",
  "recipe": [
    {
      "title": "Spicy Chicken Curry",
      "making_time": "50 min",
      "serves": "5 people",
      "ingredients": "onion, chicken, chili, seasoning",
      "cost": "1100"
    }
  ]
}
```

DELETE /recipes/{id}

```json
// Expected Response:
{
  "message": "Recipe successfully removed!"
}

//or
{
  "message": "No recipe found"
}
```

### sql file migration to sqlite

npx prisma init

## the prisma/schema.prisma was generated but since we are using sqlite and specific database url, client and db need to be updated to:

```
generator client {
  provider = "prisma-client-js" // Generates Prisma Client, which we use in our NestJS service
}

// -------------------
// 2. Datasource Block
// -------------------
datasource db {
  provider = "sqlite"                      // Use SQLite for local development / testing
  url      = env("DATABASE_URL")          // URL is loaded from .env file (e.g., file:./dev.db)
}

```

sqlite3 prisma/dev.db < sql/create.sql

## before running this command,

npx prisma db pull

1. run script to translate original create.sql to be compatible with sqlite
   run the script: /$ bash create_sqlite_file.sh

- this will create compatible file `sql/create-sqlite.sql`

2. run database creation with this file
   sqlite3 prisma/dev.db < sql/create-sqlite.sql

3. once the prisma folder is created we can no longer run /npx prisma init

and need to create it manualy

schema.prisma
`
// prisma/schema.prisma
generator client {
provider = "prisma-client-js"
}

datasource db {
provider = "sqlite"
url = env("DATABASE_URL")
}
`

4. make sure database is set inside your .env's
   with `DATABASE_URL="file:./dev.db"` < relative to /schema.prisma dir

5. next run /$ npx prisma db pull
   this will update ./prisma/schema.prisma file and add `model recipes`

6. optional migrations for dev or deploy (for production)

npx prisma migrate dev
npx prisma migrate deploy

7. this will update Client Prisma module `./node_modules/@prisma/client`
   - this should alwasy run after migrate if you intend to use it, or running for initial time and dont need to run any migrations
     /$ npx prisma generate
