/*
  Warnings:

  - Added the required column `name` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nature` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Phone" TEXT NOT NULL,
    "Tel" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Gmap" TEXT NOT NULL,
    "iframe" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "nature" TEXT NOT NULL,
    "Insta" TEXT NOT NULL,
    "Instalink" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Profile" ("Address", "Gmap", "Insta", "Instalink", "Phone", "Tel", "createdAt", "id", "iframe", "updatedAt") SELECT "Address", "Gmap", "Insta", "Instalink", "Phone", "Tel", "createdAt", "id", "iframe", "updatedAt" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
