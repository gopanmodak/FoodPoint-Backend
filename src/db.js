const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@foodpoint.bftrbtn.mongodb.net/FoodPoint?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database Connected");
  } catch (error) {
    console.log("Db Connection Error", error)
    /* process.exit(1); */
  }
};

module.exports = connectDB;
