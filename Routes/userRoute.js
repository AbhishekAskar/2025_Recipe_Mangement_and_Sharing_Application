const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getProfile, updateProfile } = require("../Controllers/userController");
const { verifyToken } = require("../Middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

// 👤 Profile Routes
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);

module.exports = router;
