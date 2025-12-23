const express = require("express");
const {
  createReservationController
} = require("../controllers/reservationController");


const {
  cancelReservationController
} = require("../controllers/cancelReservationController");

const router = express.Router();            

router.post("/", createReservationController);
router.delete("/:reservationId", cancelReservationController);

module.exports = router;
