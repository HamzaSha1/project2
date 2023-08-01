var express = require("express");
var router = express.Router();
const nursesCtrl = require("../controllers/nurses");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// /clients/whatever

router.get("/", nursesCtrl.index);
router.get("/booking/:id", nursesCtrl.bookingPage);
router.get("/details/:id", nursesCtrl.nurseDetails);
router.post("/details/:id", nursesCtrl.createReview);

module.exports = router;
