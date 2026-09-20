const express = require("express");
const router = express.Router();

const banglaFood = require("../data/BanglaFood.json");
const bangla = require('../model/banglaFoodModel')


  //POST methode
  router.post("/", async (req, res) => {
    try {
      const count = await bangla.countDocuments();
      if (count > 0) {
        return res.status(400).send({
          message: "data already added",
        });
      }

      const result = await bangla.insertMany(banglaFood);
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
      const result = await bangla.find()
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({
        message: "Data did not found",
        error: error.message,
      });
    }
  });
  //get sigle bangla food

  router.get("/:id", async (req, res) => {
    try {
      const result = await bangla.findOne({ _id: req.params.id });
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({
        message: "Data did not found",
        error: error.message,
      });
    }
  });

  module.exports = router
