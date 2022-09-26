/*
  Warnings:

  - You are about to drop the column `amount` on the `users` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "avatar" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_users" ("avatar", "createdAt", "id", "name", "password", "registration") SELECT "avatar", "createdAt", "id", "name", "password", "registration" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_registration_key" ON "users"("registration");
CREATE TABLE "new_Requests" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ProdutId" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "amountProduct" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Requests_ProdutId_fkey" FOREIGN KEY ("ProdutId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Requests_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Requests" ("ProdutId", "UserId", "id") SELECT "ProdutId", "UserId", "id" FROM "Requests";
DROP TABLE "Requests";
ALTER TABLE "new_Requests" RENAME TO "Requests";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
