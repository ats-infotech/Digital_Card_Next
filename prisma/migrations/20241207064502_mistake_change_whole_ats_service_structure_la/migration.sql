-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AtsServiceInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "ServiceId" INTEGER NOT NULL
);
INSERT INTO "new_AtsServiceInfo" ("ServiceId", "id", "title") SELECT "ServiceId", "id", "title" FROM "AtsServiceInfo";
DROP TABLE "AtsServiceInfo";
ALTER TABLE "new_AtsServiceInfo" RENAME TO "AtsServiceInfo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
