const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth-controller");
const router = express.Router();

// Routes related to authentication & authorization.
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
