const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",require("./routes/authRoute"));
// app.use("/api/trip");

app.get('/',(req, res) => {
    res.send("Welcome to the TripMate API")
})

module.exports = app