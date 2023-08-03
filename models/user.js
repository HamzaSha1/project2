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

const bookingSchema = new Schema(
  {
    timeslot: String,
    // nameBooking: { type: String, required: true, unique: true },
    location: {
      type: mongoose.Schema.Types.Mixed,
      default: {
        address: {
          houseNumber: "",
          blockNumber: "",
          roadNumber: "",
        },
      },
    },
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
    address: {
      houseNumber: String,
      blockNumber: String,
      roadNumber: String,
    },
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
