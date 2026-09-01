const express = require("express");
const router = express.Router();

const ourFoods = require("../data/OurFood.json");

module.exports = (db) => {
  const ourFoodsCollection = db.collection("ourFoods");

  // POST method
  router.post("/", async (req ,res) => {
    try {
      const count = await ourFoodsCollection.countDocuments();
      if (count > 0) {
        return res.status(400).send({ message: "Our Foods already added" });
      }

      const result = await ourFoodsCollection.insertMany(ourFoods);
      res.send({ insertedCount: result.insertedCount });
    } catch(error) {
      res.status(500).send({ message: "Our Foods insert failed", error: error.message });
    }
  });

  //  GET method 
  router.get("/", async (req, res)=> {
    try {
      const result = await ourFoodsCollection.find().toArray();
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Our Foods fetch failed", error: error.message });
    }
  });

  return router;
};
