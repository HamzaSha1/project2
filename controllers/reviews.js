const User = require('../models/user');

module.exports = {
  create,
  delete: deleteReview
};

async function create(req, res) {
  const nurse = await User.findById(req.params.id);
  // We can push (or unshift) subdocs into Mongoose arrays
  nurse.reviews.push(req.body);
  try {
    // Save any changes made to the user doc
    await nurse.save();
  } catch (err) {
    console.log(err);
  }
  // Redirect back to the nurse's details page
  res.redirect(`/nurses/details/${nurse._id}`);
}

async function deleteReview(req, res) {
  const { id, reviewId } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(id);

    // Check if the user exists and has reviews
    if (user && user.reviews.length > 0) {
      // Find the index of the review in the user's reviews
      const reviewIndex = user.reviews.findIndex((review) => review.id === reviewId);

      // If the review is found, remove it
      if (reviewIndex !== -1) {
        user.reviews.splice(reviewIndex, 1);
        await user.save();
      }
    }

    // Redirect back to the nurse's details page
    res.redirect(`/nurses/details/${id}`);
  } catch (e) {
    // Handle any errors that occur during the process
    console.error(`error ==> ${e}`);
    res.status(500).send("Error deleting review");
  }
}