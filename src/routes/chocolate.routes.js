const express = require("express");
const router = express.Router();

const chocolate = require("../data/Chocolate.json");
const chocolateCollection = require("../model/chocolateModel");


  // POST method
  router.post("/", async (req ,res) => {
    try {
      const count = await chocolateCollection.countDocuments();
      if (count > 0) {
        return res.status(400).send({ message: "Chocolate already added" });
      }

      const result = await chocolateCollection.insertMany(chocolate);
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Chocolate insert failed", error: error.message });
    }
  });

  // GET method
  router.get("/", async (req, res)=> {
    try {
      const result = await chocolateCollection.find()
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Chocolate fetch failed", error: error.message });
    }
  });

  //get single single chocolate
  router.get("/:id",async (req,res) => {
    try {
      const id =req.params.id;
       const result = await chocolateCollection.findById(id)
      res.send(result);
      
    } catch (error) {
      res.status(500).send({
        message:"Chocolate not  found by id",
        error:error.message
      })
      
    }
    
  })
  module.exports = router;

