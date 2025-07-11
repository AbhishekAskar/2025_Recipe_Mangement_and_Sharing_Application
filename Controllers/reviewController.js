const { Review, Recipe, User } = require("../Models");

// ⭐ Add or update a review
exports.addOrUpdateReview = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { rating, comment } = req.body;

    const [review, created] = await Review.upsert({
      userId: req.user.userId,
      recipeId,
      rating,
      comment,
    }, { returning: true });

    res.status(201).json({
      message: created ? "Review added" : "Review updated",
      review,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📖 Get all reviews for a recipe
exports.getRecipeReviews = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const reviews = await Review.findAll({
      where: { recipeId },
      include: {
        model: User,
        attributes: ["id", "name", "profilePicUrl"],
      },
      order: [["createdAt", "DESC"]],
    });

    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length || 0;

    res.status(200).json({ avgRating: avgRating.toFixed(1), reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🗑️ Delete own review
exports.deleteReview = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const deleted = await Review.destroy({
      where: {
        userId: req.user.userId,
        recipeId,
      },
    });

    if (!deleted) return res.status(404).json({ message: "Review not found" });

    res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
