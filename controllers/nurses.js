const User = require("../models/user");

module.exports = {
  index,
  nurseDetails,
  bookingPage,
  createReview,
};

async function index(req, res) {
  const nurses = await User.find({ role: "Nurse" });

  const filteredNurses = nurses.filter((nurse) => {
    return nurse.role !== "Admin" && nurse.role !== "Customer";
  });
  
  res.render("clients/index", {
    title: "List of Nurses",
    filteredNurses
  });
}

async function bookingPage(req, res) {
  const nurse = await User.findById(req.params.id);
  res.render("clients/booking", {
    title: "Nurse Booking Page",
    nurse
  });
}

async function nurseDetails(req, res) {
  // Populate the cast array with performer docs instead of ObjectIds
  const nurse = await User.findById(req.params.id);
  res.render(`clients/details`, {
    title: "Nurse Details",
    nurse
  });
}

async function createReview(req, res) {
  const nurse = await User.findById(req.params.id);
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  nurse.reviews.push(req.body);
  try {
    // Save any changes made to the movie doc
    await nurse.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/clients/details/${nurse._id}`);
}
