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

  // Add the booking to the user
  const nurse = await User.findById(nurseId);
  const customer = await User.findById(customerId);

  nurseName = nurse.name;
  nurseEmail = nurse.email;
  customerName = customer.name;
  customerEmail = customer.email;

  const booking = new Booking({
    customerId,
    nurseId,
    bookingDate,
    bookingTime,
    bookingNotes,
    nurseName,
    nurseEmail,
    customerName,
    customerEmail,
  });

  await booking.save();

  try {
    const nurse = await User.findById(nurseId);
    const customer = await User.findById(customerId);
    if (!nurse || !customer) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    nurse.booking.push(booking);
    await nurse.save();

    // saved the booking to the customer as well
    customer.booking.push(booking);
    await customer.save();

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
  const user = await User.findById(req.params.id);
  console.log(user.booking);
  res.render(`bookings/bookingPage`, {
    title: "Booking Page",
    user,
  });
}
