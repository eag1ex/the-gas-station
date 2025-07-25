DROP TABLE IF EXISTS recipes;

CREATE TABLE IF NOT EXISTS recipes (
  id integer PRIMARY KEY ,
  -- name of recipe
  title varchar(100)  NOT NULL,
  -- time required to cook/bake the recipe
  making_time varchar(100)  NOT NULL,
  -- number of people the recipe will feed
  serves varchar(100)  NOT NULL,
  -- food items necessary to prepare the recipe
  ingredients varchar(300)  NOT NULL,
  -- price of recipe
  cost integer NOT NULL,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime  NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO recipes (
  id,
  title,
  making_time,
  serves,
  ingredients,
  cost,
  created_at,
  updated_at
)
VALUES (
  1,
  'Chicken Curry',
  '45 min',
  '4 people',
  'onion, chicken, seasoning',
  1000,
  '2016-01-10 12:10:12',
  '2016-01-10 12:10:12'
);

INSERT INTO recipes (
  id,
  title,
  making_time,
  serves,
  ingredients,
  cost,
  created_at,
  updated_at
)
VALUES (
  2,
  'Rice Omelette',
  '30 min',
  '2 people',
  'onion, egg, seasoning, soy sauce',
  700,
  '2016-01-11 13:10:12',
  '2016-01-11 13:10:12'
); 