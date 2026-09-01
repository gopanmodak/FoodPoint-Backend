const express = require("express");
const router = express.Router();

const steaks = require("../data/Steaks.json");

module.exports = (db) => {
  const steaksCollection = db.collection("steaks");

  // POST method
  router.post("/", async (req ,res) => {
    try {
      const count = await steaksCollection.countDocuments();
      if (count > 0) {
        return res.status(400).send({ message: "Steaks already added" });
      }

      const result = await steaksCollection.insertMany(steaks);
      res.send({ insertedCount: result.insertedCount });
    } catch(error) {
      res.status(500).send({ message: "Steaks insert failed", error: error.message });
    }
  });

  // GET method
  router.get("/", async (req, res)=> {
    try {
      const result = await steaksCollection.find().toArray();
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Steaks fetch failed", error: error.message });
    }
  });

  return router;
};
