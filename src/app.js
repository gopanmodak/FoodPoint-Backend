const express = require("express");
const cors = require("cors");

const app = express();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173",],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
//database connecttion

const { connectDB, getDB } = require("./db.js");

//routes
const bbqFood = require("./routes/bbq.routes.js");
const banglaFood = require("./routes/banglaFood.routes.js");
const featureFood = require("./routes/featurefood.routes.js");
const breads = require("./routes/breads.routes.js");
const bestFoods = require("./routes/bestFood.routes.js");
const burger = require("./routes/burger.routes.js");
const chocolate = require("./routes/chocolate.routes.js");
const desserts = require("./routes/desserts.routes.js");
const steak = require("./routes/steaks.routes.js");
const drinks = require("./routes/drinks.routes.js");
const friedChicken = require("./routes/featurefood.routes.js");
const iceCream = require("./routes/iceCream.routes.js");
const indianFoods = require("./routes/indianFood.routes.js");
const ourFoods = require("./routes/ourFood.routes.js");
const pizza = require("./routes/pizza.routes.js");
const sandwich = require("./routes/sandwich.routes.js");
const sausages = require("./routes/sausage.routes.js");

const startServer = async () => {
  try {
    await connectDB();
    const db = getDB();

    app.get("/", (req, res) => {
      res.send(
        `Welcome to the Food API Server v1.0 (bbqs, banglafoods, featurefoods, breads, bestfoods, burgers, chocolates, desserts, steaks, drinks, friedchicken, icecream, indianfoods, ourfoods, pizzas, sandwiches, sausages)`,
      );
    });

    //api endpoints
    app.use("/bbqs", bbqFood(db));
    app.use("/banglafoods", banglaFood(db));
    app.use("/featurefoods", featureFood(db));
    app.use("/breads", breads(db));
    app.use("/bestfoods", bestFoods(db));
    app.use("/burgers", burger(db));
    app.use("/chocolates", chocolate(db));
    app.use("/desserts", desserts(db));
    app.use("/steaks", steak(db));
    app.use("/drinks", drinks(db));
    app.use("/friedchicken", friedChicken(db));
    app.use("/icecream", iceCream(db));
    app.use("/indianfoods", indianFoods(db));
    app.use("/ourfoods", ourFoods(db));
    app.use("/pizza", pizza(db));
    app.use("/sandwiches", sandwich(db));
    app.use("/sausages", sausages(db));
  } catch (error) {
    console.log("Server failed to start", error.message);
  }
};

startServer();

module.exports = app;
