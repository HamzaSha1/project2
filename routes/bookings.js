var express = require("express");
var router = express.Router();
const bookingsCtrl = require("../controllers/bookings");

router.post("/:id", bookingsCtrl.timeslotBooking);

module.exports = router;
