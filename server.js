require('dotenv').config();
const app = require('./src/app.js');
const port = process.env.PORT || 3000;

app.listen(port, () =>{
  console.log(`FoodPoint SERVER is Running in port ${port}`)
})