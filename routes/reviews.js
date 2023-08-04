const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

// POST /nurses/:id/reviews (create review for a nurse)
router.post('/nurses/:id/reviews', reviewsCtrl.create);

// DELETE /nurses/:id/reviews/:reviewId (delete a review from a nurse)
router.delete("/nurses/:id/reviews/:reviewId", reviewsCtrl.delete);

module.exports = router;
