/*
  Warnings:

  - Added the required column `Broadcastlink` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Broadcastlink` to the `SunildiamondProfile` table without a default value. This is not possible if the table is not empty.

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
    "Desc" TEXT NOT NULL,
    "otherlink" TEXT NOT NULL,
    "linktitle" TEXT NOT NULL,
    "Broadcastlink" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Profile" ("Address", "Desc", "Gmap", "Insta", "Instalink", "Phone", "Tel", "createdAt", "id", "iframe", "linktitle", "name", "nature", "otherlink", "updatedAt", "year") SELECT "Address", "Desc", "Gmap", "Insta", "Instalink", "Phone", "Tel", "createdAt", "id", "iframe", "linktitle", "name", "nature", "otherlink", "updatedAt", "year" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE TABLE "new_SunildiamondProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "gmap" TEXT NOT NULL,
    "iframe" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "fromday" TEXT NOT NULL,
    "today" TEXT NOT NULL,
    "fromtime" TEXT NOT NULL,
    "totime" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "Broadcastlink" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_SunildiamondProfile" ("createdAt", "email", "fromday", "fromtime", "gmap", "id", "iframe", "name", "number", "subtitle", "title", "today", "totime", "updatedAt", "year") SELECT "createdAt", "email", "fromday", "fromtime", "gmap", "id", "iframe", "name", "number", "subtitle", "title", "today", "totime", "updatedAt", "year" FROM "SunildiamondProfile";
DROP TABLE "SunildiamondProfile";
ALTER TABLE "new_SunildiamondProfile" RENAME TO "SunildiamondProfile";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
