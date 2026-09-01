const express = require("express");
const router = express.Router();

const sausages = require("../data/Steaks.json");

module.exports = (db) => {
  const sausagesCollection =db.collection("sausages");

  //post methode
  router.post("/", async (req ,res) => {
    try{

      const count =await sausagesCollection.countDocuments();
      if(count >0){
        return res.status(400).send({
          message: "Sausages already added"
        })
      }

      const result = await sausagesCollection.insertMany(sausages);
      res.send({
        insertedCount: result.insertedCount,
      })

    }catch(error){
      res.status(500).send({
        message: "Sausages fetch failed",
        error: error.message
      })
    }


    //get methode

    router.get("/", async (req, res)=> {
      try{
        const result = await sausagesCollection.find().toArray();
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
