const User = require("../models/user");

module.exports = {
  index,
  show: nurseDetails,
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

async function nurseDetails(req, res) {
  const nurseId = req.params.id;
  const nurse = await User.findById(nurseId);
  console.log(`req.user ==> ${JSON.stringify(req.user)}`);
  
  res.render(`nurses/details`, {
    title: "Nurse Details",
    nurse
  });
}