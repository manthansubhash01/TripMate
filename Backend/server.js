const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection")
const app = require("./app")


const PORT = process.env.PORT || 7000;

connectDb();

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})