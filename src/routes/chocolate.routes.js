const express = require("express");
const router = express.Router();

const chocolate = require("../data/Chocolate.json");

module.exports = (db) => {
  const chocolateCollection = db.collection("chocolate");

  // POST method
  router.post("/", async (req ,res) => {
    try {
      const count = await chocolateCollection.countDocuments();
      if (count > 0) {
        return res.status(400).send({ message: "Chocolate already added" });
      }

      const result = await chocolateCollection.insertMany(chocolate);
      res.send({ insertedCount: result.insertedCount });
    } catch(error) {
      res.status(500).send({ message: "Chocolate insert failed", error: error.message });
    }
  });

  // GET method
  router.get("/", async (req, res)=> {
    try {
      const result = await chocolateCollection.find().toArray();
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Chocolate fetch failed", error: error.message });
    }
  });

  return router;
};
