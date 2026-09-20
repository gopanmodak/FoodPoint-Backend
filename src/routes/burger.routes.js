const express = require("express");
const router = express.Router();

const burger = require("../data/Burger.json");

const burgerCollection = require('../model/burgerModel')

  // POST method
  router.post("/", async (req ,res) => {
    try {
      const count = await burgerCollection.countDocuments();
      if (count > 0) {
        return res.status(400).send({ message: "Burger already added" });
      }

      const result = await burgerCollection.insertMany(burger);
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Burger insert failed", error: error.message });
    }
  });

  //get methode
  router.get("/", async (req, res)=> {
    try {
      const result = await burgerCollection.find()
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Burger fetch failed", error: error.message });
    }
  });
  //get single burger

    router.get("/:id",async (req,res) => {
      try {
        const id =req.params.id;
         const result = await burgerCollection.findById(id)
        res.send(result);
        
      } catch (error) {
        res.status(500).send({
          message:"Burger not  found by id",
          error:error.message
        })
        
      }
      
    })


module.exports = router
