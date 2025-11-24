const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itineraryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Itinerary",
      default: null, // Optional - can track expenses without linking to itinerary
    },
    tripName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Accommodation",
        "Food",
        "Transport",
        "Activities",
        "Shopping",
        "Other",
      ],
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
    },
    description: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);
