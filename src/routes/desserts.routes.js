const express = require("express");
const router = express.Router();

const desserts = require("../data/Desserts.json");
const dessertsCollection = require("../model/desertsModel");

// POST method
router.post("/", async (req, res) => {
  try {
    const count = await dessertsCollection.countDocuments();
    if (count > 0) {
      return res.status(400).send({ message: "Desserts already added" });
    }

    const result = await dessertsCollection.insertMany(desserts);
    res.send(result);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Desserts insert failed", error: error.message });
  }
});

// GET method
router.get("/", async (req, res) => {
  try {
    const result = await dessertsCollection.find();
    res.send(result);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Desserts fetch failed", error: error.message });
  }
});

//get single
router.get("/:id", async (req, res) => {
  try {
    const result = await dessertsCollection.findOne({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Desserts fetch failed", error: error.message });
  }
});

module.exports = router;
