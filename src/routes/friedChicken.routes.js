const express = require("express");
const router = express.Router();

const friedChicken = require("../data/FriedChicken.json");
const friedChickenCollection = require("../model/friedChickenModel");



  // POST method
  router.post("/", async (req ,res) => {
    try {
      const count = await friedChickenCollection.countDocuments();
      if (count > 0) {
        return res.status(400).send({ message: "Fried Chicken already added" });
      }
      const result = await friedChickenCollection.insertMany(friedChicken);
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Fried Chicken insert failed", error: error.message });
    }
  });

  // GET method
  router.get("/", async (req, res)=> {
    try {
      const result = await friedChickenCollection.find()
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Fried Chicken fetch failed", error: error.message });
    }
  });


    //get single fried chicken
    
        router.get("/:id",async (req,res) => {
          try {
            const id =req.params.id;
             const result = await friedChickenCollection.findById(id)
            res.send(result);
            
          } catch (error) {
            res.status(500).send({
              message:"Chocolate not  found by id",
              error:error.message
            })
            
          }
          
        })
  module.exports = router
