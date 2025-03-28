/*
  Warnings:

  - Added the required column `price` to the `SunildiamondProduct` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SunildiamondProduct" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_SunildiamondProduct" ("createdAt", "id", "image", "name", "updatedAt") SELECT "createdAt", "id", "image", "name", "updatedAt" FROM "SunildiamondProduct";
DROP TABLE "SunildiamondProduct";
ALTER TABLE "new_SunildiamondProduct" RENAME TO "SunildiamondProduct";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
