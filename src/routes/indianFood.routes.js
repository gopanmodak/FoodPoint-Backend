const express = require("express");
const router = express.Router();

const indianFoods = require("../data/IndianFood.json");
const indianFoodsCollection = require("./../model/indianFood.Model")




  // POST method
  router.post("/", async (req ,res) => {
    try {
      const count = await indianFoodsCollection.countDocuments();
      if (count > 0) {
        return res.status(400).send({ message: "Indian Foods already added" });
      }

      const result = await indianFoodsCollection.insertMany(indianFoods);
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Indian Foods insert failed", error: error.message });
    }
  });

  // GET method (separate block)
  router.get("/", async (req, res)=> {
    try {
      const result = await indianFoodsCollection.find()
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Indian Foods fetch failed", error: error.message });
    }
  });

  //get single indian foods

    router.get("/:id",async (req,res) => {
      try {
        const id =req.params.id;
         const result = await indianFoodsCollection.findById(id)
        res.send(result);
        
      } catch (error) {
        res.status(500).send({
          message:"Indianfoods not  found by id",
          error:error.message
        })
        
      }
      
    })


module.exports = router