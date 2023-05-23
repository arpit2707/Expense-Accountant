const sequelize = require("sequelize");
const sequelizer = require("../util/db");

const fileT = sequelizer.define("expenseFile", {
  id: {
    type: sequelize.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  fileUrl: sequelize.STRING,
});

module.exports = fileT;
