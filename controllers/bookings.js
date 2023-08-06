const User = require("../models/user");
const Booking = require("../models/booking");

module.exports = {
  book: timeslotBooking,
  show: showBookedSessions,
  update: updateStatus,
};

async function timeslotBooking(req, res) {
  const customerId = req.user._id;
  const nurseId = req.params.id;
  const bookingDate = req.body.bookingDate;
  const bookingTime = req.body.bookingTime;
  const bookingNotes = req.body.bookingNotes;

  // Add the booking to the user
  const nurse = await User.findById(nurseId);
  const customer = await User.findById(customerId);

  const nurseName = nurse.name;
  const nurseEmail = nurse.email;
  const nursePrice = nurse.price;
  const customerName = customer.name;
  const customerEmail = customer.email;
  const customerHouse = customer.address.houseNumber;
  const customerBlock = customer.address.blockNumber;
  const customerRoad = customer.address.roadNumber;

  const booking = new Booking({
    customerId,
    nurseId,
    bookingDate,
    bookingTime,
    bookingNotes,
    nurseName,
    nurseEmail,
    nursePrice,
    customerName,
    customerEmail,
    customerHouse,
    customerBlock,
    customerRoad,
  });

  await booking.save();

  try {
    if (!nurse || !customer) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // saved the booking to the nurse
    nurse.booking.push(booking);
    await nurse.save();

    // saved the booking to the customer
    customer.booking.push(booking);
    await customer.save();

    res.redirect(`/nurses/details/${nurseId}`);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the booking.",
    });
  }
}

async function showBookedSessions(req, res) {
  const user = await User.findById(req.params.id).populate("booking");
  const customerBooking = await Booking.find({ customerId: req.params.id });
  // const nurseBooking = await Booking.find({ nurseId: req.params.id });
  // filter pending bookings
  const pendingBooking = await Booking.find({
    nurseId: req.params.id,
    status: "Pending",
  });
  // filter approved bookings
  const approvedBooking = await Booking.find({
    nurseId: req.params.id,
    status: "Approved",
  });
  // filter declined bookings
  const declinedBooking = await Booking.find({
    nurseId: req.params.id,
    status: "Declined",
  });
  res.render(`bookings/bookingPage`, {
    title: "Booking Page",
    user,
    customerBooking,
    pendingBooking,
    approvedBooking,
    declinedBooking
  });
}

async function updateStatus(req, res) {
  const bookingId = req.params.id;
  const bookingStatus = req.body.status;
  await Booking.updateOne({ _id: bookingId }, { status: bookingStatus });
  res.redirect(`/`);
}
