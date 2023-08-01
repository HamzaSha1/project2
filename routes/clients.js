var express = require("express");
var router = express.Router();
const clientsCtrl = require("../controllers/clients");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// /clients/whatever

router.get("/clientHomePage", clientsCtrl.index);
router.get("/clientBookingPage/:id", clientsCtrl.bookingPage);
router.get("/clientNurseDetails/:id", clientsCtrl.nurseDetails);
router.post("/clientNurseDetails/:id", clientsCtrl.createReview);
module.exports = router;
