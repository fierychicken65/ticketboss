const {
  cancelReservation
} = require("../services/cancelReservationService");

async function cancelReservationController(req, res) {
  try {
    const { reservationId } = req.params;
    await cancelReservation(reservationId);
    return res.status(204).send();
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || "Internal server error";
    return res.status(status).json({ error: message });
  }
}

module.exports = {
  cancelReservationController
};
