const User = require("../models/user");
const Booking = require("../models/booking");

module.exports = {
  timeslotBooking,
  showBookedSessions,
};

async function timeslotBooking(req, res) {
  customerId = req.user._id;
  nurseId = req.params.id;
  bookingDate = req.body.bookingDate;
  bookingTime = req.body.bookingTime;
  bookingNotes = req.body.bookingNotes;
  console.log(`customerId ==> ${customerId}`);
  console.log(`nurseId ==> ${nurseId}`);
  console.log(`bookingDate ==> ${bookingDate}`);
  console.log(`bookingTime ==> ${bookingTime}`);
  console.log(`bookingNotes ==> ${bookingNotes}`);

  const booking = new Booking({
    customerId,
    nurseId,
    bookingDate,
    bookingTime,
    bookingNotes,
  });

  await booking.save();

  try {
    // Add the booking to the user
    const user = await User.findById(nurseId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.booking.push(booking);
    await user.save();

    res.redirect(`/nurses`);

    // Add booking to customer object

    // Add booking to nurse object

    // Save the updated customer object

    // Save the updated nurse object
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the booking.",
    });
  }
}


async function showBookedSessions(req, res) {
  const nurse = await User.findById(req.params.id);
  res.render(`bookings/bookingPage`, {
    title: "Booking Page",
    nurse,
  });
}
