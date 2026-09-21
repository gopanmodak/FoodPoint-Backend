const user = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

     //validation
    if (!name || !email || !password) {
      return res.status(400).send({
        message: "All fields are required",
        success: false,
      });
    }

    //check if user exists

    const existingUser = await user.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send({
        message: "User already exists",
        success: false,
      });
    }

    //hash password

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //create user
    const newUser = await user({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();

    //token

    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    if (!token) {
      return res.status(400).send({
        message: "Token not generated",
        success: false,
      });
    }
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res.status(201).send({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Register Error..Something went wrong",
      error: error.message,
    });
  }
};
module.exports = register;
