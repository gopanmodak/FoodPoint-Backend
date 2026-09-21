const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const app = express();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);
app.use(cookieParser())

//routes
const bbqRoutes = require("./routes/bbq.routes");
const bestFoods = require("./routes/bestFood.routes");
const featureFoods = require("./routes/featurefood.routes");
const breadsFoods = require("./routes/breads.routes");
const chocolates = require("./routes/chocolate.routes");
const burgerFoods = require("./routes/burger.routes");
const banglaFoods = require("./routes/banglaFood.routes");
const deserts = require("./routes/desserts.routes");
const drinks = require("./routes/drinks.routes");
const friedChicken = require("./routes/friedChicken.routes");
const iceCream = require("./routes/iceCream.routes");
const steaks = require("./routes/steaks.routes");
const indianFoods = require("./routes/indianFood.routes");
const sausages = require("./routes/sausage.routes");
const ourFoods = require("./routes/ourFood.routes");
const pizza = require("./routes/pizza.routes");
const sandwich = require("./routes/sandwich.routes");
const menu = require("./routes/menu.routes");
const signup = require("./routes/signin.routes");
const logout = require("./routes/logout.routes");
const login = require("./routes/login.routes");

const runServer = () => {
  try {
    app.get("/", (req, res) => {
      res.send("Server Is Running Successfully");
    });

    //api endpoints
    app.use("/bbq", bbqRoutes);
    app.use("/bestfood", bestFoods);
    app.use("/featurefood", featureFoods);
    app.use("/breads", breadsFoods);
    app.use("/chocolates", chocolates);
    app.use("/burger", burgerFoods);
    app.use("/banglafoods", banglaFoods);
    app.use("/deserts", deserts);
    app.use("/drinks", drinks);
    app.use("/friedchicken", friedChicken);
    app.use("/icecream", iceCream);
    app.use("/steaks", steaks);
    app.use("/indianfoods", indianFoods);
    app.use("/sausages", sausages);
    app.use("/ourfoods", ourFoods);
    app.use("/menu", menu);
    app.use("/pizza", pizza);
    app.use("/sandwich", sandwich);
    app.use("/api", login);
    app.use("/api", logout);
    app.use("/api", signup);
    
  } catch (error) {
    console.log("Server run error:", error);
  }
};

runServer();

module.exports = app;
