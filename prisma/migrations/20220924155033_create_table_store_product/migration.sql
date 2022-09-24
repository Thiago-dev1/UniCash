-- CreateTable
CREATE TABLE "Shops" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "StoreId" TEXT NOT NULL,
    CONSTRAINT "products_StoreId_fkey" FOREIGN KEY ("StoreId") REFERENCES "Shops" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
