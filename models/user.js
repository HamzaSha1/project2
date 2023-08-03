const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  reviewerId: String,
  reviewerName: String,
  reviewerAvatar: String,
  reviewerRole: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5,
  },
});

const addressSchema = new Schema(
  {
    houseNumber: String,
    block: String,
    roadNumber: String,
  },
  {
    timestamps: true,
  }
);

const bookingSchema = new Schema(
  {
    timeslot: String,
    // nameBooking: { type: String, required: true, unique: true },
    location: [addressSchema],
  },
  {
    timestamps: true,
  }
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["Nurse", "Customer"],
      default: "Customer",
    },
    location: [addressSchema],
    phoneNumber: { type: Number },
    avatar: String,
    qualifications: String,
    education: String,
    reviews: [reviewSchema],
    price: Number,
    booking: [bookingSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);