/*
  Warnings:

  - You are about to drop the column `large` on the `Sizes` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Products_id_fkey" FOREIGN KEY ("id") REFERENCES "Sizes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Products_id_fkey" FOREIGN KEY ("id") REFERENCES "Previewimages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Products" ("code", "createdAt", "id", "name", "price", "type") SELECT "code", "createdAt", "id", "name", "price", "type" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
CREATE TABLE "new_Sizes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "extrasmall" BOOLEAN NOT NULL,
    "small" BOOLEAN NOT NULL,
    "meduim" BOOLEAN NOT NULL,
    "extralarge" BOOLEAN NOT NULL,
    "extraextralarge" BOOLEAN NOT NULL
);
INSERT INTO "new_Sizes" ("extraextralarge", "extralarge", "extrasmall", "id", "meduim", "small") SELECT "extraextralarge", "extralarge", "extrasmall", "id", "meduim", "small" FROM "Sizes";
DROP TABLE "Sizes";
ALTER TABLE "new_Sizes" RENAME TO "Sizes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
