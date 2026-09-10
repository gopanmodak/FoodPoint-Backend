const express = require("express");
const router = express.Router();

const faq = require("../data/Faq.json");

module.exports = (db) => {
  const faqCollection = db.collection("faq");

  // insert FAQ.json data
  router.post("/", async (req, res) => {
    try {
      const result = await faqCollection.insertMany(faq);
      res.send({
        insertedCount: result.insertedCount,
      });
    } catch (error) {
      res.status(500).send({
        message: "Faq Collection insert failed",
        error: error.message,
      });
    }
  });

  // যদি client থেকে FAQ পাঠাতে চাও
  router.post("/add", async (req, res) => {
    try {
      const newFaq = req.body;
      const result = await faqCollection.insertOne(newFaq);
      res.send({
        insertedId: result.insertedId,
      });
    } catch (error) {
      res.status(500).send({
        message: "Faq insert failed",
        error: error.message,
      });
    }
  });

  // get route
  router.get("/", async (req, res) => {
    try {
      const result = await faqCollection.find().toArray();
      res.send(result);
    } catch (error) {
      res.status(500).send({
        message: "Faq fetch failed",
        error: error.message,
      });
    }
  });

  return router;
};
