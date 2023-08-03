var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const logger = require("morgan");
var methodOverride = require("method-override");

// It's very important to require dotenv before any other module
// that depends upon the properties added to process.env
require("dotenv").config();
//
require("./config/database");
//
require("./config/passport");

//
var session = require("express-session");
//
var passport = require("passport");

const indexRouter = require("./routes/index");
const nurseRouter = require("./routes/nurses");
const usersRouter = require("./routes/users");
const reviewsRouter = require("./routes/reviews");
// var clientRouter = require("./routes/clients");
const bookingsRouter = require("./routes/bookings");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Configure and Mount Session Middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Mount Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Now the logged in user is in a user variable that's available inside all EJS templates
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use(methodOverride("_method"));
app.use("/", indexRouter);
app.use("/nurses", nurseRouter);
app.use("/users", usersRouter);
app.use("/bookings", bookingsRouter);
app.use("/", reviewsRouter);
// app.use("/clients", clientRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
