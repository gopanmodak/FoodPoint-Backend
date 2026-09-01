const express = require("express");
const router = express.Router();

const drinks = require("../data/Drinks.json");

module.exports = (db) => {
  const drinksCollection = db.collection("drinks");

  // POST method
  router.post("/", async (req, res) => {
    try {
      const count = await drinksCollection.countDocuments();
      if (count > 0) {
        return res.status(400).send({
          message: "Drinks Already Added"
        });
      }

      const result = await drinksCollection.insertMany(drinks);
      res.send({
        insertedCount: result.insertedCount
      });
    } catch (error) {
      res.status(500).send({
        message: "Error inserting drinks",
        error: error.message
      });
    }
  });

  // GET method
  router.get("/", async (req, res) => {
    try {
      const result = await drinksCollection.find().toArray(); 
      res.send(result);
    } catch (error) {
      res.status(500).send({
        message: "Error fetching drinks",
        error: error.message
      });
    }
  });

  return router;
};
