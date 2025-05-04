const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  destination: String,
  days: Number,
  enrichedDays: Array,
  packingList: Object,
});

module.exports = mongoose.model("Itinerary", itinerarySchema);