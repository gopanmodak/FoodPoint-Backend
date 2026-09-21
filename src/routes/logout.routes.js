const express = require("express");

const router = express.Router();
const logout = require("../controllers/LogoutControllers.js");

router.post("/logout", logout);
module.exports = router;
