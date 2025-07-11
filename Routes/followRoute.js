const express = require("express");
const router = express.Router();
const {
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers,
  getActivityFeed,
} = require("../Controllers/followController");
const { verifyToken } = require("../Middlewares/authMiddleware");

router.post("/follow/:userIdToFollow", verifyToken, followUser);
router.delete("/unfollow/:userIdToUnfollow", verifyToken, unfollowUser);
router.get("/following", verifyToken, getFollowing);
router.get("/followers", verifyToken, getFollowers);
router.get("/feed", verifyToken, getActivityFeed);

module.exports = router;
