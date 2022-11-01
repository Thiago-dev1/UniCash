/*
  Warnings:

  - Added the required column `user_id` to the `statements` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_statements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    CONSTRAINT "statements_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_statements" ("amount", "id", "title") SELECT "amount", "id", "title" FROM "statements";
DROP TABLE "statements";
ALTER TABLE "new_statements" RENAME TO "statements";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
