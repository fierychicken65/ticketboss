const express = require("express");
const {
  createReservationController
} = require("../controllers/reservationController");

const router = express.Router();

router.post("/", createReservationController);

module.exports = router;
