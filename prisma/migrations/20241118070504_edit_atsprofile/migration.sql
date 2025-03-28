-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AtsProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "facebook" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "linkdin" TEXT NOT NULL,
    "twitter" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "gmap" TEXT NOT NULL,
    "iframe" TEXT NOT NULL,
    "Projects" TEXT NOT NULL,
    "Clients" TEXT NOT NULL,
    "Countries" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_AtsProfile" ("Clients", "Countries", "Location", "Projects", "createdAt", "facebook", "gmap", "id", "iframe", "instagram", "linkdin", "mail", "number", "twitter", "updatedAt", "website") SELECT "Clients", "Countries", "Location", "Projects", "createdAt", "facebook", "gmap", "id", "iframe", "instagram", "linkdin", "mail", "number", "twitter", "updatedAt", "website" FROM "AtsProfile";
DROP TABLE "AtsProfile";
ALTER TABLE "new_AtsProfile" RENAME TO "AtsProfile";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
