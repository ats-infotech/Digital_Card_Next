/*
  Warnings:

  - Added the required column `extralarge` to the `Sizes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `large` to the `Sizes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sizes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "extrasmall" BOOLEAN NOT NULL,
    "small" BOOLEAN NOT NULL,
    "meduim" BOOLEAN NOT NULL,
    "large" BOOLEAN NOT NULL,
    "extralarge" BOOLEAN NOT NULL,
    "extraextralarge" BOOLEAN NOT NULL
);
INSERT INTO "new_Sizes" ("extraextralarge", "extrasmall", "id", "meduim", "small") SELECT "extraextralarge", "extrasmall", "id", "meduim", "small" FROM "Sizes";
DROP TABLE "Sizes";
ALTER TABLE "new_Sizes" RENAME TO "Sizes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
