const prisma = require("../db/prisma");

async function listReservations() {
  return prisma.reservation.findMany({
    orderBy: { createdAt: "desc" }
  });
}

module.exports = {
  listReservations
};
