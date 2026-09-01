const express = require("express");
const router = express.Router();

const breads = require("../data/Breads.json");

module.exports = (db) => {
  const breadsCollection = db.collection("breads");

  // POST method
  router.post("/", async (req ,res) => {
    try {
      const count = await breadsCollection.countDocuments();
      if (count > 0) {
        return res.status(400).send({ message: "Breads already added" });
      }

      const result = await breadsCollection.insertMany(breads);
      res.send({ insertedCount: result.insertedCount });
    } catch(error) {
      res.status(500).send({ message: "Breads insert failed", error: error.message });
    }
  });

  // GET method
  router.get("/", async (req, res)=> {
    try {
      const result = await breadsCollection.find().toArray();
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Breads fetch failed", error: error.message });
    }
  });

  return router;
};
