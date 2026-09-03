const express = require("express");

const router = express.Router();
const menu = require("../data/menu.json");

module.exports = (db) => {
  const menuCollection = db.collection("menu");

  //POST Methode

  router.post("/", async (req, res) => {
    try{
      const count = await menuCollection.countDocuments();
      if(count>0){
        return res.status(400).send({
          message: "Menu already added"
        })
      }

      const result = await menuCollection.insertMany(menu);
      return res.status(200).send({
        message: "Menu added",
        insertedCount: result.insertedCount
      })
    }
    catch(error){
      return res.status(500).send({
        message: "Error adding menu"
      })
    }

  })

  //GET Methode

  router.get("/", async (req, res) => {
    try{
      const result = await menuCollection.find().toArray();
      return res.status(200).send(result);
    }
    catch(error){
      return res.status(500).send({
        message: "Error fetching menu"
      })
    }
  })


  return router;

}