/*
  Warnings:

  - You are about to drop the column `ServiceId` on the `AtsServiceDescription` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `AtsServiceInfo` table. All the data in the column will be lost.
  - Added the required column `SubServiceId` to the `AtsServiceDescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ServiceId` to the `AtsServiceInfo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AtsServiceDescription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "SubServiceId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AtsServiceDescription_SubServiceId_fkey" FOREIGN KEY ("SubServiceId") REFERENCES "AtsServiceInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AtsServiceDescription" ("createdAt", "description", "id") SELECT "createdAt", "description", "id" FROM "AtsServiceDescription";
DROP TABLE "AtsServiceDescription";
ALTER TABLE "new_AtsServiceDescription" RENAME TO "AtsServiceDescription";
CREATE TABLE "new_AtsServiceInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "ServiceId" INTEGER NOT NULL,
    CONSTRAINT "AtsServiceInfo_ServiceId_fkey" FOREIGN KEY ("ServiceId") REFERENCES "AtsServices" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AtsServiceInfo" ("id", "title") SELECT "id", "title" FROM "AtsServiceInfo";
DROP TABLE "AtsServiceInfo";
ALTER TABLE "new_AtsServiceInfo" RENAME TO "AtsServiceInfo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
