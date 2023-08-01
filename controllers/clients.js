const User = require("../models/user");

module.exports = {
  index,
  nurseDetails,
  bookingPage,
};

async function index(req, res) {
  const nurses = await User.find({
    role: "Nurse",
  });

  const filteredNurses = nurses.filter(nurse => {
    return nurse.role !== "Admin" && nurse.role !== "Customer";
  });
  res.render("clients/clientHomePage", { title: "Home", filteredNurses});
}

async function nurseDetails(req, res) {
  // Populate the cast array with performer docs instead of ObjectIds
  const nurse = await User.findById(req.params.id);
  res.render("clients/clientNurseDetails", { nurse });
}

async function bookingPage(req, res) {
  const nurse = await User.findById(req.params.id);
  res.render("clients/clientBookingPage", { title: "Nurse Booking Page", nurse });
}
