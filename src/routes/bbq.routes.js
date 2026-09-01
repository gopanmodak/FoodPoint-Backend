const express = require("express");
const router = express.Router();

const bbqFood = require("../data/bbqs.json");

module.exports = (db) => {
  //post methode
  const bbqCollection = db.collection("bbqs");
  router.post("/", async (req, res) => {
    try {
      const count = await bbqCollection.countDocuments();
      if (count > 0) {
        return res.status(400).send({
          message: "BBQ food already exists. Duplicate insert blocked!",
        });
      }
      const result = await bbqCollection.insertMany(bbqFood);
      res.status(200).send({
        message: "BBQ food added!",
        insertedCount: result.insertedCount,
      });
    } catch (error) {
      res.status(500).send({
        message: " Data Fetch Failed",
        error: error.message,
      });
    }
  });

  //get methode

  router.get("/", async (req, res) => {
    try {
      const result = await bbqCollection.find().toArray();
      res.status(200).send(result);
    } catch (error) {
      res.status(5000).send({
        message: "Data Fetch Error",
        error: error.message,
      });
    }
  });

  return router;
};
