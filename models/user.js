const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  reviewerId: String,
  reviewerName: String,
  reviewerAvatar: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  }
}, {
  timestamps: true
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
