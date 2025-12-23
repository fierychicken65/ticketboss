const prisma = require("../db/prisma");

async function getEventSummary() {
  const eventId = "node-meetup-2025";

  const event = await prisma.event.findUnique({
    where: { eventId }
  });

  if (!event) {
    throw { status: 500, message: "Event not found" };
  }

  const reservationCount = await prisma.reservation.count({
    where: {
      eventId,
      status: "confirmed"
    }
  });

  return {
    eventId: event.eventId,
    name: event.name,
    totalSeats: event.totalSeats,
    availableSeats: event.availableSeats,
    reservationCount,
    version: event.version
  };
}

module.exports = {
  getEventSummary
};
