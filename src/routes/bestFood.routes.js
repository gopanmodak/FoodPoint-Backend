const express = require("express");
const router = express.Router();

const bestFoods = require("../data/BestFood.json");

module.exports = (db) => {
  const bestFoodsCollection = db.collection("bestFoods");

  // POST method
  router.post("/", async (req ,res) => {
    try {
      const count = await bestFoodsCollection.countDocuments();
      if (count > 0) {
        return res.status(400).send({ message: "Best foods already added" });
      }

      const result = await bestFoodsCollection.insertMany(bestFoods);
      res.send({ insertedCount: result.insertedCount });
    } catch(error) {
      res.status(500).send({ message: "Best foods insert failed", error: error.message });
    }
  });

  // GET method
  router.get("/", async (req, res)=> {
    try {
      const result = await bestFoodsCollection.find().toArray();
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Best foods fetch failed", error: error.message });
    }
  });

  return router;
};
