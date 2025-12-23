const express = require("express");
const {
  listReservationsController
} = require("../controllers/listReservationsController");

const router = express.Router();

router.get("/reservations", listReservationsController);

module.exports = router;
