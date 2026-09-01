const express = require("express");
const router = express.Router();

const featureFood = require("../data/FeatureFood.json");

module.exports = (db) => {
  const featureFoodCollection = db.collection("featureFood");
  //POST methode

  router.post("/", async (req, res) => {
    try {
      const count = await featureFoodCollection.countDocuments();
      if (count > 0) {
        return res.status(400).send({
          message: "Data already added",
        });
      }
      const result = await featureFoodCollection.insertMany(featureFood);
      res.status(200).send({
        insertedCount: result.insertedCount,
      });
    } catch (error) {
      res.status(500).send({
        message: "Data Fetch failed 2",
        error: error.message,
      });
    }
  });

  //GET methode

  router.get("/", async (req, res) => {
    try {
      const result = await featureFoodCollection.find().toArray();
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({
        message: "Data Fetch failed",
        error: error.message,
      });
    }
  });

  return router;
};
