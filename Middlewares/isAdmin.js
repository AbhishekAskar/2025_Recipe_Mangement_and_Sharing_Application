const db = require("../Models");

module.exports = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.user.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
