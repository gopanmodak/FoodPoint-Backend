const express = require("express");

const router = express.Router();
const menu = require("../data/Menu.json");
const menuCollection = require("../model/menuModel");

//POST Methode

router.post("/", async (req, res) => {
  try {
    const count = await menuCollection.countDocuments();
    if (count > 0) {
      return res.status(400).send({
        message: "Menu already added",
      });
    }

    const result = await menuCollection.insertMany(menu);
    res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({
      message: "Error adding menu",
    });
  }
});

//GET Methode

router.get("/", async (req, res) => {
  try {
    const result = await menuCollection.find();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({
      message: "Error fetching menu",
    });
  }
});

//get single pizza

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await menuCollection.findById(id);
    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: "menu are not  found by id",
      error: error.message,
    });
  }
});

module.exports = router;
