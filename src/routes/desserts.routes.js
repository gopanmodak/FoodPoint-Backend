const express = require("express");
const router = express.Router();

const desserts = require("../data/Desserts.json");

module.exports = (db) => {
  const dessertsCollection = db.collection("desserts");

  // POST method
  router.post("/", async (req ,res) => {
    try {
      const count = await dessertsCollection.countDocuments();
      if (count > 0) {
        return res.status(400).send({ message: "Desserts already added" });
      }

      const result = await dessertsCollection.insertMany(desserts);
      res.send({ insertedCount: result.insertedCount });
    } catch(error) {
      res.status(500).send({ message: "Desserts insert failed", error: error.message });
    }
  });

  // GET method
  router.get("/", async (req, res)=> {
    try {
      const result = await dessertsCollection.find().toArray();
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Desserts fetch failed", error: error.message });
    }
  });

  return router;
};
