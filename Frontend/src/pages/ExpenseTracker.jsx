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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative overflow-hidden py-16 sm:py-20 md:py-24"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/28003891/pexels-photo-28003891.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative px-4 sm:px-8 md:px-12 lg:px-20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Expense Tracker
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl">
                Track and manage your travel expenses with ease
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-[#0F172A] font-semibold rounded-full hover:bg-slate-100 transition-all duration-200 active:scale-95 shadow-xl text-sm sm:text-base"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Expense
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-8 sm:py-12 md:py-16 bg-[#F9FBFC]">
        {summary && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-8 sm:mb-10">
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <TrendingUp className="h-8 w-8 sm:h-10 sm:w-10 text-[#10B981]" />
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-slate-600">
                  Total Spent
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-2">
                {summary.totalExpenses?.toFixed(2)}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Mixed currencies
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <Tag className="h-8 w-8 sm:h-10 sm:w-10 text-[#3B82F6]" />
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-slate-600">
                  Transactions
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-2">
                {summary.expenseCount}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Total entries
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <PieChart className="h-8 w-8 sm:h-10 sm:w-10 text-[#8B5CF6]" />
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-slate-600">
                  Trips
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-2">
                {Object.keys(summary.tripTotals || {}).length}
              </h2>
              <p className="text-xs text-slate-500 font-medium">Destinations</p>
            </div>
          </div>
        )}

        {summary && summary.categoryTotals && (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 md:p-10 mb-8 sm:mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-6 sm:mb-8">
              Spending by Category
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
              {Object.entries(summary.categoryTotals).map(
                ([category, amount]) => (
                  <div
                    key={category}
                    className="p-5 rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-200"
                    style={{ backgroundColor: `${categoryColors[category]}15` }}
                  >
                    <div
                      className="w-4 h-4 rounded-full mb-3 shadow-sm"
                      style={{ backgroundColor: categoryColors[category] }}
                    ></div>
                    <p className="text-sm text-slate-600 font-medium mb-2">
                      {category}
                    </p>
                    <p className="text-xl font-bold text-[#0F172A] mb-1">
                      {amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-slate-500">Mixed</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 md:p-10">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-6 sm:mb-8">
            All Expenses
          </h3>

          {expenses.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <DollarSign className="h-20 w-20 sm:h-24 sm:w-24 mx-auto mb-6 text-slate-400" />
              <p className="text-xl sm:text-2xl text-slate-600 mb-8">
                No expenses tracked yet
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#0F172A] text-white font-semibold rounded-full hover:bg-slate-900 transition-all duration-200 active:scale-95 shadow-xl text-sm sm:text-base"
              >
                Add Your First Expense
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {expenses.map((expense) => (
                <div
                  key={expense._id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 sm:p-6 bg-gradient-to-br from-slate-50 to-white rounded-xl sm:rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-300 gap-4 sm:gap-0"
                >
                  <div className="flex items-center gap-4 sm:gap-5 flex-1 w-full sm:w-auto">
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                      style={{
                        backgroundColor: `${
                          categoryColors[expense.category]
                        }20`,
                        border: `2px solid ${
                          categoryColors[expense.category]
                        }40`,
                      }}
                    >
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor: categoryColors[expense.category],
                        }}
                      ></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h4 className="font-bold text-[#0F172A] text-base sm:text-lg truncate">
                          {expense.tripName}
                        </h4>
                        <span className="text-xs bg-[#0F172A] text-white px-3 py-1 rounded-full whitespace-nowrap font-medium">
                          {expense.category}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-slate-600 line-clamp-1 mb-2">
                        {expense.description || "No description"}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center font-medium">
                        <Calendar className="inline-block h-3.5 w-3.5 mr-1.5" />
                        {new Date(expense.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-5 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-left sm:text-right">
                      <p className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                        {getCurrencySymbol(expense.currency)}
                        {expense.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        {expense.currency}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditExpense(expense)}
                        className="p-2.5 text-[#3B82F6] bg-blue-50 hover:bg-[#3B82F6] hover:text-white rounded-xl transition-all shadow-sm"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteExpense(expense._id)}
                        disabled={deleting === expense._id}
                        className={`p-2.5 rounded-xl transition-all shadow-sm ${
                          deleting === expense._id
                            ? "opacity-50 cursor-not-allowed bg-red-100 text-red-300"
                            : "text-red-500 bg-red-50 hover:bg-red-500 hover:text-white"
                        }`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-lg w-full mx-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                {editingExpense ? "Edit Expense" : "Add New Expense"}
              </h3>
              <button
                onClick={closeModal}
                className="text-slate-500 hover:text-[#0F172A] transition p-2 hover:bg-slate-100 rounded-full"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleAddExpense}>
              <div className="mb-5">
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">
                  Trip Name
                </label>
                <input
                  type="text"
                  value={formData.tripName}
                  onChange={(e) =>
                    setFormData({ ...formData, tripName: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-slate-900/80"
                  placeholder="e.g., Paris 2025"
                  required
                />
              </div>

              <div className="mb-5">
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-slate-900/80"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-slate-900/80"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">
                    Currency
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) =>
                      setFormData({ ...formData, currency: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-slate-900/80"
                  >
                    {currencies.map((curr) => (
                      <option key={curr.code} value={curr.code}>
                        {curr.symbol} {curr.code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-slate-900/80"
                  required
                />
              </div>

              <div className="mb-6 sm:mb-8">
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-slate-900/80 resize-none"
                  rows="3"
                  placeholder="Add notes about this expense..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 bg-slate-100 text-[#0F172A] font-semibold rounded-full hover:bg-slate-200 transition-all duration-200 active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className={`flex-1 px-6 py-3 bg-[#0F172A] text-white font-semibold rounded-full transition-all duration-200 shadow-xl ${
                    saving
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-slate-900 active:scale-95"
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
          className={`fixed bottom-6 right-6 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 transition-all backdrop-blur-lg ${
            toast.type === "success"
              ? "bg-green-500/90 text-white"
              : "bg-red-500/90 text-white"
          }`}
        >
          <span className="font-semibold">{toast.message}</span>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ExpenseTracker;
