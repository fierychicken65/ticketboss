const prisma = require("../db/prisma");

async function cancelReservation(reservationId) {
  return await prisma.$transaction(async (tx) => {
    // 1. Fetch reservation
    const reservation = await tx.reservation.findUnique({
      where: { reservationId }
    });

    if (!reservation || reservation.status === "cancelled") {
      throw { status: 404, message: "Reservation not found" };
    }

    const event = await tx.event.findUnique({
      where: { eventId: reservation.eventId }
    });

    if (!event) {
      throw { status: 500, message: "Event not found" };
    }

    // 2. Return seats + bump version
    await tx.event.update({
      where: { eventId: event.eventId },
      data: {
        availableSeats: { increment: reservation.seats },
        version: { increment: 1 }
      }
    });

    // 3. Mark reservation as cancelled
    await tx.reservation.update({
      where: { reservationId },
      data: {
        status: "cancelled"
      }
    });
  });
}

module.exports = {
  cancelReservation
};
