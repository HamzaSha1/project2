const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    customerId: String,
    nurseId: String,
    bookingDate: Date,
    bookingTime: String,
    bookingNotes: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
