// THIS MIGHT BE WRONG, COULD ONLY USE ONE MODEL

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  review: String,
  starRating: Number,
});

const nurseSchema = Schema(
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
      enum: ["Admin", "Nurse", "Customer"],
      default: "Customer",
    },
    address: String,
    phoneNumber: { Type: Number, required: false },
    avatar: String,
    qualifications: { Type: String, required: true },
    education: { Type: String, required: true },
    reviews: [reviewSchema],
    price: { Type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Nurse", nurseSchema);
