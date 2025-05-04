const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const verifyToken = require("../middleware/authMiddleware"); // Import authentication middleware

// Add a new expense (Authenticated)
router.post("/add", verifyToken, async (req, res) => {
  console.log("Received POST request on /expenses/add");
  console.log("Request Body:", req.body);

  try {
    const { amount, category, note, date } = req.body;

    if (!amount || !category) {
      return res.status(400).json({ message: "Amount and category are required" });
    }

    const newExpense = new Expense({
      user: req.user.id, // ✅ Link expense to authenticated user
      amount,
      category,
      note: note || "",
      date: date || Date.now(),
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    console.error("Error saving expense:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all expenses for the authenticated user
router.get("/", verifyToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }); // Fetch only the user's expenses
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get a single expense by ID (Authenticated)
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    //  Ensure the user owns this expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized: You do not own this expense" });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Modify an expense (Authenticated)
router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const { amount, category, note, date } = req.body;
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // ✅ Ensure the user owns this expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized: You do not own this expense" });
    }

    // Update the fields if provided
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.note = note !== undefined ? note : expense.note;
    expense.date = date || expense.date;

    await expense.save();
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Delete an expense (Authenticated)
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    //  Ensure the user owns this expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized: You do not own this expense" });
    }

    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
