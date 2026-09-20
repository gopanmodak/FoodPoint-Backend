
const express = require("express");

const router = express.Router();

module.exports = () => {
  router.post("/", (req, res) => {
    res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      })
      .send({
        success: true,
        message: "Logout successful",
      });
  });

  return router;
};

