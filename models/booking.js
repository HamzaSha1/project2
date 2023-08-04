const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    customerId: String,
    nurseId: String,
    nursePrice: Number,
    bookingDate: Date,
    bookingTime: String,
    bookingNotes: String,
    nurseName: String,
    customerName: String,
    nurseEmail: String,
    customerEmail: String,
  },
  {
    timestamps: true,
  }
);
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
