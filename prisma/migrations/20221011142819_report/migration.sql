/*
  Warnings:

  - Added the required column `idActivity` to the `reports` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reports" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idActivity" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "Value" INTEGER NOT NULL,
    "discipline" TEXT,
    CONSTRAINT "reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_reports" ("Value", "description", "discipline", "id", "title", "type", "userId") SELECT "Value", "description", "discipline", "id", "title", "type", "userId" FROM "reports";
DROP TABLE "reports";
ALTER TABLE "new_reports" RENAME TO "reports";
CREATE UNIQUE INDEX "reports_idActivity_key" ON "reports"("idActivity");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
