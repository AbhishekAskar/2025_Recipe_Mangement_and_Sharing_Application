const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.RDS_ENDPOINT,
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;
