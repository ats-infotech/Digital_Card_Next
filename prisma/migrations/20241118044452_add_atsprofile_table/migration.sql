-- CreateTable
CREATE TABLE "AtsProfile" (
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
