const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./Utils/db-connection");
const userRoutes = require("./Routes/userRoute");
const recipeRoutes = require("./Routes/recipeRoute");
const favoriteRoutes = require("./Routes/favoriteRoute");
const collectionRoutes = require("./Routes/collectionRoute");
const reviewRoutes = require("./Routes/reviewRoute");
const followRoutes = require("./Routes/followRoute");
const adminRoutes = require("./Routes/adminRoute");

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/social", followRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => res.send("Welcome to Recipe API 🍽️"));

// DB Sync and Start
sequelize.sync({ alter:true }).then(() => {
  console.log("DB Connected");
  app.listen(3000, () => console.log("Server running on port 3000"));
});
