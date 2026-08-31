const express = require("express");

const app = express();

//database connecttion

const { connectDB, getDB } = require("./db.js");
//router to define
const bbqFood = require("./routes/bbq.routes.js");
const banglaFood = require("./routes/banglaFood.routes.js")
const featureFood = require("./routes/featurefood.routes.js")

const startServer = async () => {
  try {
    await connectDB();
    const db = getDB();
    
    //api 
    app.use("/bbq",bbqFood(db))
    app.use("/banglafood", banglaFood(db))
    app.use('/featurefood', featureFood(db))
  } catch (error) {
    console.log("Server failed to start", error.message);
  }
};

startServer();

module.exports = app;
