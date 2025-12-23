const {
  listReservations
} = require("../services/listReservationsService");

async function listReservationsController(req, res) {
  try {
    const reservations = await listReservations();
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  listReservationsController
};
