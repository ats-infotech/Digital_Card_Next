/*
  Warnings:

  - You are about to drop the column `passwork` on the `Admins` table. All the data in the column will be lost.
  - Added the required column `password` to the `Admins` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_Admins" ("id", "username") SELECT "id", "username" FROM "Admins";
DROP TABLE "Admins";
ALTER TABLE "new_Admins" RENAME TO "Admins";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
