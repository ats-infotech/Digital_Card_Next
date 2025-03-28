/*
  Warnings:

  - Added the required column `type` to the `AtsWebServiceSteps` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AtsWebServiceSteps" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL
);
INSERT INTO "new_AtsWebServiceSteps" ("description", "icon", "id", "title") SELECT "description", "icon", "id", "title" FROM "AtsWebServiceSteps";
DROP TABLE "AtsWebServiceSteps";
ALTER TABLE "new_AtsWebServiceSteps" RENAME TO "AtsWebServiceSteps";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
