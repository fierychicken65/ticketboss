const prisma = require("./prisma");

async function seedEvent() {
  const eventId = "node-meetup-2025";

  const existingEvent = await prisma.event.findUnique({
    where: { eventId }
  });

  if (existingEvent) {
    return;
  }

  await prisma.event.create({
    data: {
      eventId,
      name: "Node.js Meet-up",
      totalSeats: 500,
      availableSeats: 500,
      version: 0
    }
  });

  console.log("Event seeded");
}

module.exports = seedEvent;
