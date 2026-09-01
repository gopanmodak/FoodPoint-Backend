const express = require("express");
const router = express.Router();

const pizza = require("../data/Pizza.json");

module.exports = (db) => {
  const pizzaCollection =db.collection("pizza");

  //post methode
  router.post("/", async (req ,res) => {
    try{

      const count = await pizzaCollection.countDocuments();
      if(count >0){
        return res.status(400).send({
          message: "Pizza already added"
        })
      }

      const result = await pizzaCollection.insertMany(pizza);
      res.send({
        insertedCount: result.insertedCount,
      })

    }catch(error){
      res.status(500).send({
        message: "Pizza fetch failed",
        error: error.message
      })
    }


    //get methode

    router.get("/", async (req, res)=> {
      try{
        const result = await pizzaCollection.find().toArray();
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
