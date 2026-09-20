const express = require("express");
const router = express.Router();

const ourFoods = require("../data/OurFood.json");
const ourFoodsCollection =require("../model/ourFoodsModel")


  // POST method
  router.post("/", async (req ,res) => {
    try {
      const count = await ourFoodsCollection.countDocuments();
      if (count > 0) {
        return res.status(400).send({ message: "Our Foods already added" });
      }

      const result = await ourFoodsCollection.insertMany(ourFoods);
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Our Foods insert failed", error: error.message });
    }
  });

  //  GET method 
  router.get("/", async (req, res)=> {
    try {
      const result = await ourFoodsCollection.find()
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Our Foods fetch failed", error: error.message });
    }
  });

  //get single ourfoods

    router.get("/:id",async (req,res) => {
      try {
        const id =req.params.id;
         const result = await ourFoodsCollection.findById(id)
        res.send(result);
        
      } catch (error) {
        res.status(500).send({
          message:"our food are not  found by id",
          error:error.message
        })
        
      }
      
    })


module.exports = router