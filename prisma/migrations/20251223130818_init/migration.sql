-- CreateTable
CREATE TABLE "Event" (
    "eventId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "totalSeats" INTEGER NOT NULL,
    "availableSeats" INTEGER NOT NULL,
    "version" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Reservation" (
    "reservationId" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Reservation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("eventId") ON DELETE RESTRICT ON UPDATE CASCADE
);
