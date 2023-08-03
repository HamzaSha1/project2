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
    phoneNumber: Number,
    avatar: String,
    qualifications: String,
    education: String,
    reviews: [reviewSchema],
    price: Number,
    booking: [
      {
        type: Schema.Types.ObjectId,
        ref: "booking",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
