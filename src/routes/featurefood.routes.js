const express = require("express");
const router = express.Router();

const foods = require("../data/FeatureFood.json");
const featureFoods = require("../model/featureFoodsModel");

//post
router.post("/", async (req, res) => {
  try {
    const count = await featureFoods.countDocuments();
    if (count > 0) {
      return res.status(400).send({
        message: "Feature Foods already added",
      });
    }

    const result = await featureFoods.insertMany(foods);
    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: "Feature Food Insert Failed", 
      error: error.message,
    });
  }
});

//get
router.get("/", async (req,res)=>{
  try {
    const result =await featureFoods.find();
    res.send(result)
    
  } catch (error) {
    res.status(500).send({
      message:"Feature food not found",
      error: error.message
    })
    
  }
})

//get food by id
router.get('/:id',async (req,res) =>{
  try {
    const id = req.params.id;
    const result = await featureFoods.findById(id);
    res.send(result);
    
  } catch (error) {
    res.status(500).send({
      message:"Food can not found by id",
      error:error.message
    })
  }
})

module.exports = router;
