/*
  Warnings:

  - You are about to drop the column `large` on the `Sizes` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
