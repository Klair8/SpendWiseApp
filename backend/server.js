require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());


//connection DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Import Routes
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

// Use Routes
app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);


 app.get("/", (req, res) => {
    res.send("✅ Serveur Express fonctionne !");
  });

 app.listen(5002, () => console.log("Server running on port 5002"));

