const user = require("../model/userModel.js")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const login =async (req,res) => {
  try {
  const {email,password} =req.body;

  //validation
  if(!email || !password){
    return res.status(400).send({
      message: "Please enter your email and password",
      success:true,
    })
  }

  //check user
  const checkUser = await user.findOne({email:email});
  if(!checkUser){
    return res.status(400).send({
      message: "User not found",
      success:false,
    })
  }


  //check password
  const passwordCheck = await bcrypt.compare(password,checkUser.password);
  if(!passwordCheck){
    return res.status(400).send({
      message: "Invalid password",
      success:false,
    })
  }

  //token

  const token = jwt.sign({id:checkUser._id},process.env.JWT_SECRET,{
    expiresIn:"1d",
  });
    res.cookie("token",token,{
       httpOnly: true,
      secure: false,
      sameSite: "lax",
    })

    res.status(200).send({
      message:"Login Successfull",
      success:true,
    })
  } catch (error) {
    res.status(500).send({
      message: "Login Error..Something went worng",
      error:error.message
    })
    
  }
  
}

module.exports = login