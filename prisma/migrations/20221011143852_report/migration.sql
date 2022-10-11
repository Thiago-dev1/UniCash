/*
  Warnings:

  - You are about to drop the column `Value` on the `reports` table. All the data in the column will be lost.
  - Added the required column `value` to the `reports` table without a default value. This is not possible if the table is not empty.

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
    "value" INTEGER NOT NULL,
    "discipline" TEXT,
    CONSTRAINT "reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_reports" ("description", "discipline", "id", "idActivity", "title", "type", "userId") SELECT "description", "discipline", "id", "idActivity", "title", "type", "userId" FROM "reports";
DROP TABLE "reports";
ALTER TABLE "new_reports" RENAME TO "reports";
CREATE UNIQUE INDEX "reports_idActivity_key" ON "reports"("idActivity");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
