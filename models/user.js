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
    customerId: {
      type: String,
      required: true
    },
    nurseId: {
      type: String,
      required: true
    },
    bookingDate: {
      type: Date,
      required: true
    },
    bookingTime: {
      type: Date,
      required: true
    },
    bookingNotes: {
      type: String,
      required: true
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
    phoneNumber: { type: Number,
      required: true,
      unique: true,
      minLength: [8, 'Phone number must be at least 8 digits long!'], 
      maxLength: [8, 'Phone number must be a maximum of 8 digits long!'], 
    },
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
