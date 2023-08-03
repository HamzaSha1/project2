const User = require("../models/user");

module.exports = {
  timeslotBooking,
};

async function timeslotBooking(req, res) {
  const nurse = await User.findById(req.params.id);
  const Customer = await User.findById(req.body.customerId);

  // Add booking to customer object

  // Add booking to nurse object

  // Save the updated customer object

  // Save the updated nurse object
}
