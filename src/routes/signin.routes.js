const express = require("express");
const register = require("../controllers/RegisterControllers");
const router = express.Router();

router.post("/signin", register);

module.exports = router;
