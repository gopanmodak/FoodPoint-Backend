const express = require("express");
const router = express.Router();

const indianFoods = require("../data/Steaks.json");

module.exports = (db) => {
  const indianFoodsCollection =db.collection("indianFoods");

  //post methode
  router.post("/", async (req ,res) => {
    try{

      const count =await indianFoodsCollection.countDocuments();
      if(count >0){
        return res.status(400).send({
          message: "Indian Foods already added"
        })
      }

      const result = await indianFoodsCollection.insertMany(indianFoods);
      res.send({
        insertedCount: result.insertedCount,
      })

    }catch(error){
      res.status(500).send({
        message: "Indian Foods fetch failed",
        error: error.message
      })
    }


    //get methode

    router.get("/", async (req, res)=> {
      try{
        const result = await indianFoodsCollection.find().toArray();
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
