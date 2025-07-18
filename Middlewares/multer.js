const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage(); // buffer in memory

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed (.jpg, .jpeg, .png)"), false);
  }
};

module.exports = multer({ storage, fileFilter });
