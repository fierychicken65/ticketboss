const express = require("express");
const {
  createReservationController
} = require("../controllers/reservationController");


const {
  cancelReservationController
} = require("../controllers/cancelReservationController");

const {
  getEventSummaryController
} = require("../controllers/eventSummaryController");

const router = express.Router();            

router.post("/", createReservationController);
router.delete("/:reservationId", cancelReservationController);
router.get("/", getEventSummaryController);

module.exports = router;
