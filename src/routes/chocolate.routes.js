const express = require("express");
const router = express.Router();

const chocolate = require("../data/Chocolate.json");

module.exports = (db) => {
  const chocolateCollection =db.collection("chocolate");

  //post methode
  router.post("/", async (req ,res) => {
    try{

      const count =await chocolateCollection.countDocuments();
      if(count >0){
        return res.status(400).send({
          message: "Chocolate already added"
        })
      }

      const result = await chocolateCollection.insertMany(chocolate);
      res.send({
        insertedCount: result.insertedCount,
      })

    }catch(error){
      res.status(500).send({
        message: "Chocolate fetch failed",
        error: error.message
      })
    }


    //get methode

    router.get("/", async (req, res)=> {
      try{
        const result = await chocolateCollection.find().toArray();
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
