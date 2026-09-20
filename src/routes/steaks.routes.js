const express = require("express");
const router = express.Router();

const steaks = require("../data/Steaks.json");
const steaksCollection = require("../model/steakeModel");

// POST method
router.post("/", async (req, res) => {
  try {
    const count = await steaksCollection.countDocuments();
    if (count > 0) {
      return res.status(400).send({ message: "Steaks already added" });
    }

    const result = await steaksCollection.insertMany(steaks);
    res.send(result);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Steaks insert failed", error: error.message });
  }
});

// GET method
router.get("/", async (req, res) => {
  try {
    const result = await steaksCollection.find();
    res.send(result);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Steaks fetch failed", error: error.message });
  }
});

//get single burger

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await steaksCollection.findById(id);
    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: "steake not  found by id",
      error: error.message,
    });
  }
});

module.exports = router;
