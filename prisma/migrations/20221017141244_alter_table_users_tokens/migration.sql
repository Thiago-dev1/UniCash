-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users_tokens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "refresh_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_users_tokens" ("createdAt", "expires_date", "id", "refresh_token", "user_id") SELECT "createdAt", "expires_date", "id", "refresh_token", "user_id" FROM "users_tokens";
DROP TABLE "users_tokens";
ALTER TABLE "new_users_tokens" RENAME TO "users_tokens";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
