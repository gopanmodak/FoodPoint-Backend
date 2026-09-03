const express = require("express");
const router = express.Router();

const sausages = require("../data/Sausage.json");


module.exports = (db) => {
  const sausagesCollection = db.collection("sausages");

  // POST method
  router.post("/", async (req ,res) => {
    try {
      const count = await sausagesCollection.countDocuments();
      if (count > 0) {
        return res.status(400).send({ message: "Sausages already added" });
      }

      const result = await sausagesCollection.insertMany(sausages);
      res.send({ insertedCount: result.insertedCount });
    } catch(error) {
      res.status(500).send({ message: "Sausages insert failed", error: error.message });
    }
  });

  // GET method
  router.get("/", async (req, res)=> {
    try {
      const result = await sausagesCollection.find().toArray();
      res.send(result);
    } catch(error) {
      res.status(500).send({ message: "Sausages fetch failed", error: error.message });
    }
  });

  return router;
};
