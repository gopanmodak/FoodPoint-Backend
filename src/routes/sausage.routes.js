const express = require("express");
const router = express.Router();

const sausages = require("../data/Sausage.json");
const sausagesCollection = require("../model/sausagesModel");




  // POST method
  router.post("/", async (req ,res) => {
    try {
      const count = await sausagesCollection.countDocuments();
      if (count > 0) {
        return res.status(400).send({ message: "Sausages already added" });
      }

      const result = await sausagesCollection.insertMany(sausages);
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Sausages insert failed", error: error.message });
    }
  });

  // GET method
  router.get("/", async (req, res)=> {
    try {
      const result = await sausagesCollection.find()
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Sausages fetch failed", error: error.message });
    }
  });

 //get single sausages foods

    router.get("/:id",async (req,res) => {
      try {
        const id =req.params.id;
         const result = await sausagesCollection.findById(id)
        res.send(result);
        
      } catch (error) {
        res.status(500).send({
          message:"sausages not  found by id",
          error:error.message
        })
        
      }
      
    })


module.exports = router
