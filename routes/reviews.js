const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const isAuthorized = require("../config/isAuthorized");

// POST /nurses/:id/reviews (create review for a nurse)
router.post('/nurses/:id/reviews', isAuthorized, reviewsCtrl.create);

// DELETE /nurses/:id/reviews/:reviewId (delete a review from a nurse)
router.delete("/nurses/:id/reviews/:reviewId", isAuthorized, reviewsCtrl.delete);

module.exports = router;
