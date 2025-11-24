const express = require("express");
const router = express.Router();
const {
  addExpense,
  getAllExpenses,
  getExpensesByTrip,
  getExpensesByItinerary,
  updateExpense,
  deleteExpense,
  getExpenseSummary,
} = require("../controllers/expenseController");
const protect = require("../middleware/authMiddleware");

router.post("/add", protect, addExpense);
router.get("/all", protect, getAllExpenses);
router.get("/trip/:tripName", protect, getExpensesByTrip);
router.get("/itinerary/:itineraryId", protect, getExpensesByItinerary);
router.get("/summary", protect, getExpenseSummary);
router.put("/update/:id", protect, updateExpense);
router.delete("/delete/:id", protect, deleteExpense);

module.exports = router;
