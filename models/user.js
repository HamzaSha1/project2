const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    review: String,
    starRating: Number,
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
    address: String,
    phoneNumber: { type: Number },
    avatar: String,
    qualifications: {
      type: Array,
      of: String,
    },
    education: {
      type: Array,
      of: String,
    },
    reviews: [reviewSchema],
    price: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
