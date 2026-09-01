const express = require("express");
const router = express.Router();

const friedChicken = require("../data/FriedChicken.json");

module.exports = (db) => {
  const friedChickenCollection =db.collection("friedChicken");

  //post methode
  router.post("/", async (req ,res) => {
    try{

      const count =await friedChickenCollection.countDocuments();
      if(count >0){
        return res.status(400).send({
          message: "Fried Chicken already added"
        })
      }

      const result = await friedChickenCollection.insertMany(friedChicken);
      res.send({
        insertedCount: result.insertedCount,
      })

    }catch(error){
      res.status(500).send({
        message: "Fried Chicken fetch failed",
        error: error.message
      })
    }


    //get methode

    router.get("/", async (req, res)=> {
      try{
        const result = await friedChickenCollection.find().toArray();
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
