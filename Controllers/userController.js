const { User, Recipe } = require("../Models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) =>{
    try {
        const { email, name, password } = req.body;

        const userExists = await User.findOne({ where: { email } })
        if(userExists){
            return res.status(400).json({ message: "User already exists!" })
        }

        const newUser = await User.create({ name, email, password });

        res.status(200).json({ message: "User Registered Successfully", user: newUser });
    } catch (error){
        res.status(500).json({ error: err.message });
    }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: { exclude: ["password"] },
      include: {
        model: Recipe,
        attributes: ["id", "title", "createdAt"],
      },
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, bio, profilePicUrl } = req.body;

    const user = await User.findByPk(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.update({ name, bio, profilePicUrl });
    res.status(200).json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
