const express = require("express");
const router = express.Router();

const burger = require("../data/Burger.json");

module.exports = (db) => {
  const burgerCollection =db.collection("burger");

  //post methode
  router.post("/", async (req ,res) => {
    try{

      const count =await burgerCollection.countDocuments();
      if(count >0){
        return res.status(400).send({
          message: "Burger already added"
        })
      }

      const result = await burgerCollection.insertMany(burger);
      res.send({
        insertedCount: result.insertedCount,
      })

    }catch(error){
      res.status(500).send({
        message: "Burger fetch failed",
        error: error.message
      })
    }


    //get methode

    router.get("/", async (req, res)=> {
      try{
        const result = await burgerCollection.find().toArray();
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
