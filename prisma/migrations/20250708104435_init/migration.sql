-- CreateTable
CREATE TABLE "Recipe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "making_time" TEXT NOT NULL,
    "serves" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
