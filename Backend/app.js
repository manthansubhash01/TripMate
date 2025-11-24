const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/trip", require("./routes/tripRoute"));
app.use("/api/expense", require("./routes/expenseRoute"));

app.get("/", (req, res) => {
  res.send("Welcome to the TripMate API");
});

module.exports = app;
