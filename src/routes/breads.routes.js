const express = require("express");
const router = express.Router();

const foods = require("../data/Breads.json");
const breadsFoods = require("../model/breadsModel");

//post
router.post("/", async (req, res) => {
  try {
    const count = await breadsFoods.countDocuments();
    if (count > 0) {
      return res.status(400).send({
        message: "Breads already added",
      });
    }
    const result = await breadsFoods.insertMany(foods);
    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: "Breads Insert failed",
      error: error.message,
    });
  }
});

//get
router.get("/", async (req, res) => {
  try {
    const result = await breadsFoods.find();
    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: "Breads not found",
      error: error.message,
    });
  }
});

//get single breads
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await breadsFoods.findById(id);
    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: "Breads not found by id",
      error: error.message,
    });
  }
});

module.exports = router;
