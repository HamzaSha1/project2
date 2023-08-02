const User = require('../models/user');

module.exports = {
  create
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
  // Step 5:  Respond to the Request (redirect if data has been changed)
  res.redirect(`/nurses/details/${nurse._id}`);
}