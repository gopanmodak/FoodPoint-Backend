const express = require("express");
const router = express.Router();

const sandwich = require("../data/Sandwich.json");
const sandwichCollection = require ('../model/sandwichModel')



  // POST method
  router.post("/", async (req ,res) => {
    try {
      const count = await sandwichCollection.countDocuments();
      if (count > 0) {
        return res.status(400).send({ message: "Sandwiches already added" });
      }

      const result = await sandwichCollection.insertMany(sandwich);
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Sandwiches insert failed", error: error.message });
    }
  });

  //  GET method 
  router.get("/", async (req, res)=> {
    try {
      const result = await sandwichCollection.find()
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Sandwiches fetch failed", error: error.message });
    }
  });

//get single sandwich

    router.get("/:id",async (req,res) => {
      try {
        const id =req.params.id;
         const result = await sandwichCollection.findById(id)
        res.send(result);
        
      } catch (error) {
        res.status(500).send({
          message:"sandwich are not  found by id",
          error:error.message
        })
        
      }
      
    })


module.exports = router