const { User, Follow, Recipe, Review } = require("../Models");

// ✅ Follow a user
exports.followUser = async (req, res) => {
  try {
    const { userIdToFollow } = req.params;

    if (userIdToFollow === req.user.userId)
      return res.status(400).json({ message: "You cannot follow yourself" });

    await Follow.create({
      followerId: req.user.userId,
      followingId: userIdToFollow,
    });

    res.status(200).json({ message: "User followed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Unfollow a user
exports.unfollowUser = async (req, res) => {
  try {
    const { userIdToUnfollow } = req.params;

    const unfollowed = await Follow.destroy({
      where: {
        followerId: req.user.userId,
        followingId: userIdToUnfollow,
      },
    });

    if (!unfollowed) return res.status(404).json({ message: "You are not following this user" });

    res.status(200).json({ message: "User unfollowed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get your followings
exports.getFollowing = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      include: { model: User, as: "Following", attributes: ["id", "name"] },
    });

    res.status(200).json(user.Following);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get your followers
exports.getFollowers = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      include: { model: User, as: "Followers", attributes: ["id", "name"] },
    });

    res.status(200).json(user.Followers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Activity Feed
exports.getActivityFeed = async (req, res) => {
  try {
    const following = await Follow.findAll({
      where: { followerId: req.user.userId },
    });

    const followingIds = following.map((f) => f.followingId);

    const recentRecipes = await Recipe.findAll({
      where: { userId: followingIds },
      include: [{ model: User, attributes: ["name"] }],
      order: [["createdAt", "DESC"]],
      limit: 10,
    });

    const recentReviews = await Review.findAll({
      where: { userId: followingIds },
      include: [
        { model: User, attributes: ["name"] },
        { model: Recipe, attributes: ["title"] },
      ],
      order: [["createdAt", "DESC"]],
      limit: 10,
    });

    res.status(200).json({
      recentRecipes,
      recentReviews,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
