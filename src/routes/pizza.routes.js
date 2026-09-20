const express = require("express");
const router = express.Router();

const pizza = require("../data/Pizza.json");
const pizzaCollection = require("../model/pizzaModel");



  // POST method
  router.post("/", async (req, res) => {
    try {
      const count = await pizzaCollection.countDocuments();
      if (count > 0) {
        return res.status(400).send({
          message: "Pizza already added"
        });
      }

      const result = await pizzaCollection.insertMany(pizza);
      res.send(result);
    } catch (error) {
      res.status(500).send({
        message: "Pizza insert failed",
        error: error.message
      });
    }
  });

  // GET method
  router.get("/", async (req, res) => {
    try {
      const result = await pizzaCollection.find()
      res.send(result);
    } catch (error) {
      res.status(500).send({
        message: "Pizza fetch failed",
        error: error.message
      });
    }
  });

//get single pizza

    router.get("/:id",async (req,res) => {
      try {
        const id =req.params.id;
         const result = await pizzaCollection.findById(id)
        res.send(result);
        
      } catch (error) {
        res.status(500).send({
          message:"pizza are not  found by id",
          error:error.message
        })
        
      }
      
    })


module.exports = router
