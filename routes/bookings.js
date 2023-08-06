var express = require("express");
var router = express.Router();
const bookingsCtrl = require("../controllers/bookings");
const isAuthorized = require("../config/isAuthorized");

router.post("/:id", isAuthorized, bookingsCtrl.book);
router.get("/:id", bookingsCtrl.show);
router.put("/:id", bookingsCtrl.update);
module.exports = router;