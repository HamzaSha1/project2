// Middleware for routes that require a logged in user
module.exports = function(req, res, next) {

  // Pass the req/res to the next middleware/route handler if the user is authenticated
  // Check if the user ID in the request matches the logged-in user's ID
  if (req.isAuthenticated()) {
    return next();
  } else {
    // User is trying to access resources of other users, redirect to their own profile page or show an error
    return res.status(403).send("You are not authorized to access.");
  }

  // Redirect to login if the user is not already logged in
  // res.redirect('/auth/google');
};
