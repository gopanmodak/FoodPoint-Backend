const express = require('express');

const router = express.Router();

const BbbqFood = require('../data/bbqs.json');

module.exports = (db) => {

  const bbqCollection = db.collection('BbqFood');

  router.post('/', async (req, res) => {

    try {

      const result = await bbqCollection.insertMany(BbbqFood);

      res.send(result);

    } catch (err) {

      console.log(err);

      res.status(500).send({
        message: 'BBQ food insert failed',
        error: err.message
      });

    }

  });

  return router;
};