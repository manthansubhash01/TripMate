const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destination: String,
    startDate: Date,
    endDate: Date,
    days: Number,
    enrichedDays: Array,
    packingList: Object,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Itinerary", itinerarySchema);
