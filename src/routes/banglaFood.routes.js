const express = require("express");
const router = express.Router();

const banglaFood = require("../data/BanglaFood.json");

module.exports = (db) => {
  const bestFoodCollection = db.collection("bestFood");
  //POST methode
  router.post("/", async (req, res) => {
    try {
      const count = await bestFoodCollection.countDocuments();
      if (count > 0) {
        return res.status(400).send({
          message: "data already added",
        });
      }

      const result = await bestFoodCollection.insertMany(banglaFood);
      res.status(200).send({
        message: "Data added",
        insertedCount: result.insertedCount,
      });
    } catch (error) {
      res.status(500).send({
        message: "Data fetch failed",
        error: error.message,
      });
    }
  });

  //GET methode

  router.get("/", async (req, res) => {
    try {
      const result = await bestFoodCollection.find().toArray();
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({
        message: "Data did not found",
        error: error.message,
      });
    }
  });
  return router;
};
