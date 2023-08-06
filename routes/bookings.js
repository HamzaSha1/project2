var express = require("express");
var router = express.Router();
const bookingsCtrl = require("../controllers/bookings");

router.post("/:id", bookingsCtrl.book);
router.get("/:id", bookingsCtrl.show);
router.put("/:id", bookingsCtrl.update);
module.exports = router;
