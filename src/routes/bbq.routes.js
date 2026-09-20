const express = require("express");

const router = express.Router();
const bbq = require("../data/bbqs.json");
const bbqFood = require("../model/bbqModel.js");

//post bbq
router.post("/", async (req, res) => {
  try {
    const count = await bbqFood.countDocuments();
    if (count > 0) {
      return res.status(400).send({ message: "Bbq Already added" });
    }
    const result = await bbqFood.insertMany(bbq);
    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: "Bbq insert failed",
      error: error.message,
    });
  }
});

//get bbq
router.get("/", async (req, res) => {
  try {
    const result = await bbqFood.find();
    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: "Can get bbq",
    });
  }
});

//get bbq by id
router.get('/:id',async(req,res)=>{
  try {
    const id =req.params.id
    const result = await bbqFood.findById(id);
    res.send(result);
    
  } catch (error) {
    res.status(500).send({
      message:"Can get your peoducts"
    })
    
  }
})

module.exports = router;
