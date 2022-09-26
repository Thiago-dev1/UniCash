-- CreateTable
CREATE TABLE "Requests" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ProdutId" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    CONSTRAINT "Requests_ProdutId_fkey" FOREIGN KEY ("ProdutId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Requests_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
