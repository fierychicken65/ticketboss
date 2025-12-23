const { createReservation } = require("../services/reservationService");

async function createReservationController(req, res) {
  try {
    const result = await createReservation(req.body);
    return res.status(201).json(result);
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || "Internal server error";
    return res.status(status).json({ error: message });
  }
}

module.exports = {
  createReservationController
};
