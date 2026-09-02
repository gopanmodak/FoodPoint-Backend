const express = require("express");
const router = express.Router();

const indianFoods = require("../data/IndianFood.json");


module.exports = (db) => {
  const indianFoodsCollection = db.collection("indianFoods");

  // POST method
  router.post("/", async (req ,res) => {
    try {
      const count = await indianFoodsCollection.countDocuments();
      if (count > 0) {
        return res.status(400).send({ message: "Indian Foods already added" });
      }

      const result = await indianFoodsCollection.insertMany(indianFoods);
      res.send({ insertedCount: result.insertedCount });
    } catch(error) {
      res.status(500).send({ message: "Indian Foods insert failed", error: error.message });
    }
  });

  // GET method (separate block)
  router.get("/", async (req, res)=> {
    try {
      const result = await indianFoodsCollection.find().toArray();
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Indian Foods fetch failed", error: error.message });
    }
  });

  return router;
};
