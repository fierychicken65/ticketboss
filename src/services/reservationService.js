const prisma = require("../db/prisma");

async function createReservation({ partnerId, seats }) {
  if (!partnerId) {
    throw { status: 400, message: "partnerId is required" };
  }

  if (seats <= 0 || seats > 10) {
    throw { status: 400, message: "Seats must be between 1 and 10" };
  }

  const eventId = "node-meetup-2025";

  return await prisma.$transaction(async (tx) => {
    const event = await tx.event.findUnique({
      where: { eventId }
    });

    if (!event) {
      throw { status: 500, message: "Event not found" };
    }

    if (event.availableSeats < seats) {
      throw { status: 409, message: "Not enough seats left" };
    }

    const updated = await tx.event.updateMany({
      where: {
        eventId,
        version: event.version,
        availableSeats: { gte: seats }
      },
      data: {
        availableSeats: { decrement: seats },
        version: { increment: 1 }
      }
    });

    if (updated.count === 0) {
      throw { status: 409, message: "Seat conflict, try again" };
    }

    const reservation = await tx.reservation.create({
      data: {
        eventId,
        partnerId,
        seats,
        status: "confirmed"
      }
    });

    return {
      reservationId: reservation.reservationId,
      seats: reservation.seats,
      status: reservation.status
    };
  });
}

module.exports = {
  createReservation
};
