require('dotenv').config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@foodpoint.bftrbtn.mongodb.net/?appName=FoodPoint`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
let db;
const connectDB = async () => {
  try {
    await client.connect();
    db = await client.db("FoodPoint");
    console.log("Databse connected");
  } catch (error) {
    console.log("Database failed to connected", error.message);
  }
};

const getDB = () => db;
module.exports = { connectDB, getDB };
