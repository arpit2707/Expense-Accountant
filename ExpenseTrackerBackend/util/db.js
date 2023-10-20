const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  `${process.env.DEFAULT_DATABASE}`,
  `${process.env.MYSQL_USER}`,
  `${process.env.MYSQL_PASSWORD}`,
  {
    dialect: 'mysql',
    host: `${process.env.DEFAULT_HOST}`,
  }
);

module.exports = sequelize;
