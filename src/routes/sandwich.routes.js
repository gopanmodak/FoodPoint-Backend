const express = require("express");
const router = express.Router();

const sandwich = require("../data/Sandwich.json");

module.exports = (db) => {
  const sandwichCollection =db.collection("sandwiches");

  //post methode
  router.post("/", async (req ,res) => {
    try{

      const count =await sandwichCollection.countDocuments();
      if(count >0){
        return res.status(400).send({
          message: "Sandwiches already added"
        })
      }

      const result = await sandwichCollection.insertMany(sandwich);
      res.send({
        insertedCount: result.insertedCount,
      })

    }catch(error){
      res.status(500).send({
        message: "Sandwiches fetch failed",
        error: error.message
      })
    }


    //get methode

    router.get("/", async (req, res)=> {
      try{
        const result = await sandwichCollection.find().toArray();
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
