const express = require('express');

const app = express();

//database connecttion

const {connectDB,getDB} =require('./db.js');
const BbbqFood = require('./routes/bbq.routes.js');

const startServer = async () => {
  try{
    await connectDB();
  const db=getDB();

  app.use('/bbqfood',BbbqFood(db))
  }catch(error){
    console.log('Server failed to start',error.message);
  }
}

startServer();

module.exports = app;