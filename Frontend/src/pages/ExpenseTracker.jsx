import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import {
  DollarSign,
  Plus,
  Trash2,
  Edit3,
  TrendingUp,
  PieChart,
  Calendar,
  Tag,
  X,
} from "lucide-react";
import TripMateLoader from "../components/Loader";

const ExpenseTracker = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [formData, setFormData] = useState({
    tripName: "",
    category: "Food",
    amount: "",
    currency: "USD",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const categories = [
    "Accommodation",
    "Food",
    "Transport",
    "Activities",
    "Shopping",
    "Other",
  ];

  const categoryColors = {
    Accommodation: "#3B82F6",
    Food: "#10B981",
    Transport: "#F59E0B",
    Activities: "#8B5CF6",
    Shopping: "#EC4899",
    Other: "#6B7280",
  };

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
    { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
    { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
  ];

  const getCurrencySymbol = (code) => {
    const currency = currencies.find((c) => c.code === code);
    return currency ? currency.symbol : "$";
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, [token]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(
        "https://tripmate-bgz6.onrender.com/api/expense/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setExpenses(data.expenses || []);
      }
    } catch (err) {
      console.error("Error fetching expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await fetch(
        "https://tripmate-bgz6.onrender.com/api/expense/summary",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSummary(data);
      }
    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingExpense
        ? `https://tripmate-bgz6.onrender.com/api/expense/update/${editingExpense._id}`
        : "https://tripmate-bgz6.onrender.com/api/expense/add";

      const method = editingExpense ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
        }),
      });

      if (response.ok) {
        setShowAddModal(false);
        setEditingExpense(null);
        setFormData({
          tripName: "",
          category: "Food",
          amount: "",
          currency: "USD",
          description: "",
          date: new Date().toISOString().split("T")[0],
        });
        fetchExpenses();
        fetchSummary();
        showToast(
          editingExpense
            ? "Expense updated successfully!"
            : "Expense added successfully!",
          "success"
        );
      } else {
        showToast("Failed to save expense", "error");
      }
    } catch (err) {
      console.error("Error saving expense:", err);
      showToast("Error saving expense", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!confirm("Are you sure you want to delete this expense?")) {
      return;
    }

    setDeleting(id);
    try {
      const response = await fetch(
        `https://tripmate-bgz6.onrender.com/api/expense/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchExpenses();
        fetchSummary();
        showToast("Expense deleted successfully!", "success");
      } else {
        showToast("Failed to delete expense", "error");
      }
    } catch (err) {
      console.error("Error deleting expense:", err);
      showToast("Error deleting expense", "error");
    } finally {
      setDeleting(null);
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setFormData({
      tripName: expense.tripName,
      category: expense.category,
      amount: expense.amount.toString(),
      currency: expense.currency,
      description: expense.description,
      date: new Date(expense.date).toISOString().split("T")[0],
    });
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingExpense(null);
    setFormData({
      tripName: "",
      category: "Food",
      amount: "",
      currency: "USD",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  if (loading) {
    return <TripMateLoader height={"h-screen"} />;
  }

  return (
    <div className="min-h-screen bg-[#F9FBFC]">
      <div className="px-20 py-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-bold text-[#0F172A] mb-2">
              <DollarSign className="inline-block h-12 mb-2 mr-3" />
              Expense Tracker
            </h1>
            <p className="text-[#7F7F7F]">
              Track and manage your travel expenses
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-[#0F172A] text-white rounded-lg hover:bg-[#1E293B] transition-all duration-200 active:scale-95"
          >
            <Plus className="inline-block h-5 mb-1 mr-2" />
            Add Expense
          </button>
        </div>

        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="h-8 w-8 text-[#10B981]" />
                <span className="text-sm text-[#7F7F7F]">Total Spent</span>
              </div>
              <h2 className="text-3xl font-bold text-[#0F172A]">
                {summary.totalExpenses?.toFixed(2)}
              </h2>
              <p className="text-xs text-[#7F7F7F] mt-1">Mixed currencies</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Tag className="h-8 w-8 text-[#3B82F6]" />
                <span className="text-sm text-[#7F7F7F]">Transactions</span>
              </div>
              <h2 className="text-3xl font-bold text-[#0F172A]">
                {summary.expenseCount}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <PieChart className="h-8 w-8 text-[#8B5CF6]" />
                <span className="text-sm text-[#7F7F7F]">Trips</span>
              </div>
              <h2 className="text-3xl font-bold text-[#0F172A]">
                {Object.keys(summary.tripTotals || {}).length}
              </h2>
            </div>
          </div>
        )}

        {summary && summary.categoryTotals && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
            <h3 className="text-2xl font-bold text-[#0F172A] mb-6">
              Spending by Category
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(summary.categoryTotals).map(
                ([category, amount]) => (
                  <div
                    key={category}
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: `${categoryColors[category]}20` }}
                  >
                    <div
                      className="w-3 h-3 rounded-full mb-2"
                      style={{ backgroundColor: categoryColors[category] }}
                    ></div>
                    <p className="text-sm text-[#7F7F7F] mb-1">{category}</p>
                    <p className="text-lg font-bold text-[#0F172A]">
                      {amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-[#7F7F7F]">Mixed</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-[#0F172A] mb-6">
            All Expenses
          </h3>

          {expenses.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">💰</div>
              <p className="text-xl text-[#7F7F7F] mb-6">
                No expenses tracked yet
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 bg-[#0F172A] text-white rounded-lg hover:bg-[#1E293B] transition-all duration-200 active:scale-95"
              >
                Add Your First Expense
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {expenses.map((expense) => (
                <div
                  key={expense._id}
                  className="flex items-center justify-between p-4 bg-[#F9FBFC] rounded-lg hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: `${
                          categoryColors[expense.category]
                        }20`,
                      }}
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: categoryColors[expense.category],
                        }}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-[#0F172A]">
                          {expense.tripName}
                        </h4>
                        <span className="text-xs bg-[#0F172A] text-white px-2 py-1 rounded">
                          {expense.category}
                        </span>
                      </div>
                      <p className="text-sm text-[#7F7F7F]">
                        {expense.description || "No description"}
                      </p>
                      <p className="text-xs text-[#7F7F7F] mt-1">
                        <Calendar className="inline-block h-3 w-3 mr-1" />
                        {new Date(expense.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right mr-4">
                      <p className="text-2xl font-bold text-[#0F172A]">
                        {getCurrencySymbol(expense.currency)}
                        {expense.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-[#7F7F7F]">
                        {expense.currency}
                      </p>
                    </div>
                    <button
                      onClick={() => handleEditExpense(expense)}
                      className="p-2 text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white rounded-lg transition-all"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteExpense(expense._id)}
                      disabled={deleting === expense._id}
                      className={`p-2 rounded-lg transition-all ${
                        deleting === expense._id
                          ? "opacity-50 cursor-not-allowed text-red-300"
                          : "text-red-500 hover:bg-red-500 hover:text-white"
                      }`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#0F172A]">
                {editingExpense ? "Edit Expense" : "Add New Expense"}
              </h3>
              <button
                onClick={closeModal}
                className="text-[#7F7F7F] hover:text-[#0F172A]"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleAddExpense}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  Trip Name
                </label>
                <input
                  type="text"
                  value={formData.tripName}
                  onChange={(e) =>
                    setFormData({ ...formData, tripName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-[#a6a6a6] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="e.g., Paris 2025"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-[#a6a6a6] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-[#a6a6a6] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    Currency
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) =>
                      setFormData({ ...formData, currency: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-[#a6a6a6] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    {currencies.map((curr) => (
                      <option key={curr.code} value={curr.code}>
                        {curr.symbol} {curr.code} - {curr.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-[#a6a6a6] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-[#a6a6a6] rounded-lg focus:outline-none focus:ring-1 focus:ring-black resize-none"
                  rows="3"
                  placeholder="Add notes about this expense..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-[#a6a6a6] text-[#0F172A] rounded-lg hover:bg-[#F9FBFC] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className={`flex-1 px-4 py-2 bg-[#0F172A] text-white rounded-lg transition-all ${
                    saving
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#1E293B] active:scale-95"
                  }`}
                >
                  {saving
                    ? "Saving..."
                    : editingExpense
                    ? "Update Expense"
                    : "Add Expense"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 z-50 transition-all ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <span className="text-lg">
            {toast.type === "success" ? "✓" : "✕"}
          </span>
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ExpenseTracker;
