const User = require("../models/user");

module.exports = {
  index,
  nurseDetails,
  bookingPage: temp,
};

async function index(req, res) {
  const nurses = await User.find({
    role: "Nurse",
  });

  const filteredNurses = nurses.filter((nurse) => {
    return nurse.role !== "Admin" && nurse.role !== "Customer";
  });
  res.render("clients/clientHomePage", { filteredNurses });
}

async function nurseDetails(req, res) {
  // Populate the cast array with performer docs instead of ObjectIds
  const user = await User.findById(req.params.id);
  // Mongoose query builder approach to retrieve performers not the movie:
  // Performer.find({}).where('_id').nin(movie.cast)
  // The native MongoDB approach uses a query object to find
  // performer docs whose _ids are not in the movie.cast array like this:
  const performers = await Performer.find({
    _id: { $nin: movie.reviews },
  }).sort("name");
  res.render("movies/show", { title: "Movie Detail", movie, performers });
}

async function temp(req, res) {
  const nurses = await User.find({
    role: "Nurse",
  });

  const filteredNurses = nurses.filter((nurse) => {
    return nurse.role !== "Admin" && nurse.role !== "Customer";
  });
  res.render("clients/clientHomePage", { filteredNurses });
}
