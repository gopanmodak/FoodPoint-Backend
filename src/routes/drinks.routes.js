const express = require("express");
const router = express.Router();

const drinks = require("../data/Drinks.json");
const drinksCollection = require("../model/drinksModel");



  // POST method
  router.post("/", async (req, res) => {
    try {
      const count = await drinksCollection.countDocuments();
      if (count > 0) {
        return res.status(400).send({
          message: "Drinks Already Added"
        });
      }

      const result = await drinksCollection.insertMany(drinks);
      res.send(result);
    } catch (error) {
      res.status(500).send({
        message: "Error inserting drinks",
        error: error.message
      });
    }
  });

  // GET method
  router.get("/", async (req, res) => {
    try {
      const result = await drinksCollection.find()
      res.send(result);
    } catch (error) {
      res.status(500).send({
        message: "Error fetching drinks",
        error: error.message
      });
    }
  });

    //get single drinks
  
      router.get("/:id",async (req,res) => {
        try {
          const id =req.params.id;
           const result = await drinksCollection.findById(id)
          res.send(result);
          
        } catch (error) {
          res.status(500).send({
            message:"Chocolate not  found by id",
            error:error.message
          })
          
        }
        
      })

module.exports = router;