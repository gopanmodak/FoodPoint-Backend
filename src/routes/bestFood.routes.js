const express = require("express");
const router = express.Router();

const bestFood = require("../data/BestFood.json");
const bestFoods = require("../model/bestFoodModel");


//post
router.post("/", async (req, res) => {
  try {
    const count = await bestFoods.countDocuments();
    if (count > 0) {
      return res.status(400).send({
        message: " Bestfood already added",
      });
    }

    const result = await bestFoods.insertMany(bestFood);
    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: "Best food insert failed",
    });
  }
});

//get
router.get("/", async (req, res) =>{
  try {
    const result = await bestFoods.find();
    res.send(result);
    
  } catch (error) {
    res.status(500).send({
      message: "Best food can not found"
    })
    
  }
})

//get best food by id

router.use("/:id",async(req,res)=>{
  try {
    const id = req.params.id
    const result =await bestFoods.findById(id);
    res.send(result)
    
  } catch (error) {
    res.status(500).send({
      message: "Your best food is not found"
    })
    
  }
})

module.exports = router