const User = require("../models/user");
const Booking = require("../models/booking");

module.exports = {
  timeslotBooking,
  showBookedSessions,
};

async function timeslotBooking(req, res) {
  const { customerId, nurseId, bookingDate, bookingTime, bookingNotes } =
    req.body;

  const booking = new Booking({
    customerId,
    nurseId,
    bookingDate,
    bookingTime,
    bookingNotes,
  });

  await booking.save();

  // Add the booking to the user
  const user = await User.findById(nurseId);
  user.booking.push(booking);
  await user.save();

  res.status(200).json({
    success: true,
    booking,
  });

  // Add booking to customer object

  // Add booking to nurse object

  // Save the updated customer object

  // Save the updated nurse object
}

async function showBookedSessions(req, res) {
  const nurse = await User.findById(req.params.id);
  res.render(`bookings/bookingPage`, {
    title: "Booking Page",
    nurse,
  });
}
