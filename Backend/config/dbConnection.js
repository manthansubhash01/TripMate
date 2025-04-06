const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDb = async () => {
  try {
    const dbObject = await mongoose.connect(process.env.DB_URI);
    console.log("Connected to Database")
    console.log(dbObject.connection.name)
  } catch {

  }
};


module.exports = connectDb;