const User = require("../models/user");

module.exports = {
  index,
  nurseDetails,
  bookingPage,
  createReview,
  showClientProfile,
  updateProfile,
};

async function index(req, res) {
  const nurses = await User.find({ role: "Nurse" });

  const filteredNurses = nurses.filter((nurse) => {
    return nurse.role !== "Customer";
  });

  res.render("nurses/index", {
    title: "List of Nurses",
    filteredNurses,
  });
}

async function bookingPage(req, res) {
  const nurse = await User.findById(req.params.id);
  res.render("nurses/booking", {
    title: "Nurse Booking Page",
    nurse,
  });
}

async function nurseDetails(req, res) {
  // Populate the cast array with performer docs instead of ObjectIds
  const nurse = await User.findById(req.params.id);
  res.render(`nurses/details`, {
    title: "Nurse Details",
    nurse,
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
  res.redirect(`/nurses/details/${nurse._id}`);
}

async function showClientProfile(req, res) {
  // const userID = await User.findOne({ role: "Nurse" });
  console.log(req.params.id);
  const user = await User.findOne({ _id: req.params.id });
  res.render(`nurses/clientProfile`, { title: "Profile", user });
}

async function updateProfile(req, res) {
  const userId = req.params.id;
  const updated_user = await User.updateOne({ _id: userId }, req.body);
  res.redirect(`/users/${req.params.id}`);
}
