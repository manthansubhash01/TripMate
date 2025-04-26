const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: String,
  days: Number,
  topAttractions: Array,
  plan: String,
  // flightOffers: Array,
  hotelOffers: Array,
});

module.exports = mongoose.model("Itinerary", itinerarySchema);