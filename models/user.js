const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  review: String,
  starRating: Number,
});

const userSchema = Schema(
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
    qualifications: {
      Type: Array,
      of: String,
      required: true,
    },
    education: {
      Type: Array,
      of: String,
      required: true,
    },
    reviews: [reviewSchema],
    price: { Type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
