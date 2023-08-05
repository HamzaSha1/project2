const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users");
const isAuthorized = require("../config/isAuthorized");

router.get("/:id/edit", isAuthorized, usersCtrl.edit);

router.put("/:id", isAuthorized, usersCtrl.update);

router.get("/:id", isAuthorized, usersCtrl.show);

router.delete("/:id", isAuthorized, usersCtrl.delete);

module.exports = router;