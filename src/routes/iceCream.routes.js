const express = require("express");
const router = express.Router();

const iceCream = require("../data/IceCream.json");

module.exports = (db) => {
  const iceCreamCollection = db.collection("iceCream");

  // POST method
  router.post("/", async (req ,res) => {
    try {
      const count = await iceCreamCollection.countDocuments();
      if (count > 0) {
        return res.status(400).send({ message: "Ice Cream already added" });
      }

      const result = await iceCreamCollection.insertMany(iceCream);
      res.send({ insertedCount: result.insertedCount });
    } catch(error) {
      res.status(500).send({ message: "Ice Cream insert failed", error: error.message });
    }
  });

  // GET method
  router.get("/", async (req, res)=> {
    try {
      const result = await iceCreamCollection.find().toArray();
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Ice Cream fetch failed", error: error.message });
    }
  });

  return router;
};
