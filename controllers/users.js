const User = require('../models/user');


module.exports ={
edit,
update,
show,
// delete: deleteNurse,
} ;




// GET a edit TODO view
async function edit(req, res) {
    const user = await User.findById(req.params.id);
    console.log("params id ===> " + req.params.id);
    console.log("user ===> " + JSON.stringify(user));
    res.render('users/details', {
    // GET the todo
    user,
    title: "Nurse- edit",
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
    const nurse = await User.findById(req.params.id);
    // TODO check if user is a nurse?
    // if user.role !== "Customer"

    //if user is a nurse then render nurse show page
    res.render("users/show", {title: "Show User", user: nurse});

    // TODO if not a nurse do this

}





