const express = require("express");
const router = express.Router();

const iceCream = require("../data/IceCream.json");
const iceCreamCollection = require("../model/iceCreamModel");



  // POST method
  router.post("/", async (req ,res) => {
    try {
      const count = await iceCreamCollection.countDocuments();
      if (count > 0) {
        return res.status(400).send({ message: "Ice Cream already added" });
      }

      const result = await iceCreamCollection.insertMany(iceCream);
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Ice Cream insert failed", error: error.message });
    }
  });

  // GET method
  router.get("/", async (req, res)=> {
    try {
      const result = await iceCreamCollection.find()
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Ice Cream fetch failed", error: error.message });
    }
  });

   //get single icecream
    router.get("/:id",async (req,res) => {
      try {
        const id =req.params.id;
         const result = await iceCreamCollection.findById(id)
        res.send(result);
        
      } catch (error) {
        res.status(500).send({
          message:"Icecream not  found by id",
          error:error.message
        })
        
      }
      
    })


module.exports = router
