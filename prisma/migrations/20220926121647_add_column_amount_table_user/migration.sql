-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "avatar" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_users" ("avatar", "createdAt", "id", "name", "password", "registration") SELECT "avatar", "createdAt", "id", "name", "password", "registration" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_registration_key" ON "users"("registration");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
