const dotenv = require('dotenv');
dotenv.config();

const app = require('./src/app.js')
const connectDB = require('./src/db.js')


const port = process.env.PORT || 3000



connectDB().then(()=>{
  try {

    app.listen(port,()=>{
      console.log(`Server is running on port ${port}`)
    })
    
  } catch (error) {
  
    console.log('Server not Start',error)
  }
})






