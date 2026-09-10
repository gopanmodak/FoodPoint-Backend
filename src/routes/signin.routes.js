const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

module.exports = () => {

  router.post('/jwt', (req, res) =>{
    const user =req.body
    const token = jwt.sign(user,process.env.PRIVATE_KEY,{expiresIn: '1h'})

    res.cookie('token',token,{
      httpOnly:true,
      secure:true,
      sameSite:'strict'
    })
  })
  return router;
};
