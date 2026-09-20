const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

module.exports = () => {

  // LOGIN
  router.post("/jwt", (req, res) => {
    const user = req.body;

    const accessToken = jwt.sign(
      user,
      process.env.PRIVATE_KEY,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      {
        email: user.email,
      },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.send({
      success: true,
      message: "Login successful",
    });
  });


  // REFRESH ACCESS TOKEN
  router.post("/refresh", (req, res) => {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).send({
        message: "Refresh token not found",
      });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_KEY,
      (error, decoded) => {

        if (error) {
          return res.status(401).send({
            message: "Invalid or expired refresh token",
          });
        }

        const newAccessToken = jwt.sign(
          {
            email: decoded.email,
          },
          process.env.PRIVATE_KEY,
          {
            expiresIn: "15m",
          }
        );

        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        });

        res.send({
          success: true,
          message: "Access token refreshed",
        });
      }
    );
  });


  return router;
};
