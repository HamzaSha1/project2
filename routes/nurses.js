var express = require("express");
var router = express.Router();
const nursesCtrl = require("../controllers/nurses");

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });
// /nurses/whatever

// router.get("/nurseHomePage", nursesCtrl.index);
// router.get("/nurseBooking", nursesCtrl.bookingPage);

module.exports = router;
