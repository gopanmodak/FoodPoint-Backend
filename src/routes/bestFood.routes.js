const express = require("express");
const router = express.Router();

const bestFoods = require("../data/BestFood.json");

module.exports = (db) => {
  const bestFoodsCollection =db.collection("bestFoods");

  //post methode
  router.post("/", async (req ,res) => {
    try{

      const count =await bestFoodsCollection.countDocuments();
      if(count >0){
        return res.status(400).send({
          message: "Best foods already added"
        })
      }

      const result = await bestFoodsCollection.insertMany(bestFoods);
      res.send({
        insertedCount: result.insertedCount,
      })

    }catch(error){
      res.status(500).send({
        message: "Best foods fetch failed",
        error: error.message
      })
    }


    //get methode

    router.get("/", async (req, res)=> {
      try{
        const result = await bestFoodsCollection.find().toArray();
        res.send(result)
      }catch(error){
        res.status(500).send({
          message: "Data did not found",
          error: error.message
        })
      }
    })
  })
  return router;
};
