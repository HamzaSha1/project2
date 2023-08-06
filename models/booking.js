const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    customerId: String,
    nurseId: String,
    bookingDate: Date,
    bookingTime: String,
    bookingNotes: String,
    nurseName: String,
    nurseEmail: String,
    nursePrice: Number,
    customerName: String,
    customerEmail: String,
    customerHouse: Number,
    customerBlock: Number,
    customerRoad: Number,
    phoneNumber: Number,
    status: {
      type: String,
      enum: ["Pending", "Approved", "Declined"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
