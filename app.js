const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const sequelize = require("./Utils/db-connection");

// Import routes
const userRoutes = require("./Routes/userRoute");
const recipeRoutes = require("./Routes/recipeRoute");
const favoriteRoutes = require("./Routes/favoriteRoute");
const collectionRoutes = require("./Routes/collectionRoute");
const reviewRoutes = require("./Routes/reviewRoute");
const followRoutes = require("./Routes/followRoute");
const adminRoutes = require("./Routes/adminRoute");

dotenv.config({ debug: true });

const app = express();
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public"))); // assuming your HTML/CSS/JS lives in a folder called `public`

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/social", followRoutes);
app.use("/api/admin", adminRoutes);

// Root route (optional)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html")); // default to signup
});

// DB Sync & Start Server
sequelize.sync({ force: false }).then(() => {
  console.log("✅ DB Connected");
  app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
});
