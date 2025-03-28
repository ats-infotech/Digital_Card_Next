-- CreateTable
CREATE TABLE "AtsServiceInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AtsServiceDescription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "ServiceId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AtsServiceDescription_ServiceId_fkey" FOREIGN KEY ("ServiceId") REFERENCES "AtsServiceInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
