const Expense = require("../models/expenseModel");

// Add a new expense
const addExpense = async (req, res) => {
  const userId = req.user._id;
  const {
    itineraryId,
    tripName,
    category,
    amount,
    currency,
    description,
    date,
  } = req.body;

  try {
    const newExpense = await Expense.create({
      userId,
      itineraryId: itineraryId || null,
      tripName,
      category,
      amount,
      currency: currency || "USD",
      description: description || "",
      date: date || new Date(),
    });

    res
      .status(201)
      .json({ message: "Expense added successfully", expense: newExpense });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding expense" });
  }
};

// Get all expenses for a user
const getAllExpenses = async (req, res) => {
  const userId = req.user._id;

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json({ expenses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching expenses" });
  }
};

// Get expenses for a specific trip
const getExpensesByTrip = async (req, res) => {
  const userId = req.user._id;
  const { tripName } = req.params;

  try {
    const expenses = await Expense.find({ userId, tripName }).sort({
      date: -1,
    });
    res.status(200).json({ expenses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching expenses" });
  }
};

// Get expenses for a specific itinerary
const getExpensesByItinerary = async (req, res) => {
  const userId = req.user._id;
  const { itineraryId } = req.params;

  try {
    const expenses = await Expense.find({ userId, itineraryId }).sort({
      date: -1,
    });
    res.status(200).json({ expenses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching expenses" });
  }
};

// Update an expense
const updateExpense = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  const updates = req.body;

  try {
    const expense = await Expense.findOne({ _id: id, userId });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res
      .status(200)
      .json({
        message: "Expense updated successfully",
        expense: updatedExpense,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating expense" });
  }
};

// Delete an expense
const deleteExpense = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;

  try {
    const expense = await Expense.findOne({ _id: id, userId });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await Expense.deleteOne({ _id: id });
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting expense" });
  }
};

// Get expense summary/analytics
const getExpenseSummary = async (req, res) => {
  const userId = req.user._id;

  try {
    const expenses = await Expense.find({ userId });

    // Calculate totals by category
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    // Calculate totals by trip
    const tripTotals = expenses.reduce((acc, expense) => {
      acc[expense.tripName] = (acc[expense.tripName] || 0) + expense.amount;
      return acc;
    }, {});

    // Calculate overall total
    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    res.status(200).json({
      totalExpenses,
      expenseCount: expenses.length,
      categoryTotals,
      tripTotals,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching expense summary" });
  }
};

module.exports = {
  addExpense,
  getAllExpenses,
  getExpensesByTrip,
  getExpensesByItinerary,
  updateExpense,
  deleteExpense,
  getExpenseSummary,
};
