const User = require("../models/user");

module.exports = {
  index,
  nurseDetails,
  edit,
  update,
  show,
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

// async function bookingPage(req, res) {
//   const nurse = await User.findById(req.params.id);
//   res.render("nurses/booking", {
//     title: "Nurse Booking Page",
//     nurse,
//   });
// }

async function nurseDetails(req, res) {
  const nurseId = req.params.id;
  const nurse = await User.findById(nurseId);
  console.log(`req.user ==> ${JSON.stringify(req.user)}`);
  
  res.render(`nurses/details`, {
    title: "Nurse Details",
    nurse
  });
}

// async function createReview(req, res) {
//   const nurse = await User.findById(req.params.id);
//   req.body.user = req.user._id;
//   req.body.userName = req.user.name;
//   req.body.userAvatar = req.user.avatar;
//   nurse.reviews.push(req.body);
//   try {
//     // Save any changes made to the movie doc
//     await nurse.save();
//   } catch (err) {
//     console.log(err);
//   }
//   res.redirect(`/nurses/details/${nurse._id}`);
// }


// GET a edit TODO view
async function edit(req, res) {
  const customer = await User.findById(req.params.id);
  console.log("params id ===> " + req.params.id);
  console.log("user ===> " + JSON.stringify(customer));
  res.render('nurses/clientProfile', {
    customer,
  title: "customer- edit",
  });
}
// Put call to update a single todo item
async function update(req, res) {
  console.log("Body ===> " + JSON.stringify(req.body));
  // Models are responible for CRUD'ing the data
  const userId = req.params.id;

  await User.updateOne({_id: userId},req.body)
  // updated_user
  res.redirect(`/users/${req.params.id}`);

  // await User.updateOne(req.params.id, req.body);
  // Always do a redirect when data has been changed
  
}

async function show(req, res) {
  // Populate the cast array with performer docs instead of ObjectIds
  const customer = await User.findById(req.params.id);
  // TODO check if user is a nurse?
  // if user.role !== "Customer"

  //if user is a nurse then render nurse show page
  res.render("nurses/details", {title: "Show User", user: customer});

  // TODO if not a nurse do this

}