const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection")

const app = express();

const PORT = process.env.PORT || 7000;

connectDb();
app.use(express.json())

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})