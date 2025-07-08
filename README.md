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
