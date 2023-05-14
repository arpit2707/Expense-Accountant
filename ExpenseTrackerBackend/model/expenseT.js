const Sequelize = require("sequelize");

const sequelize = require("../util/db");

const ExpensesT = sequelize.define("expense", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  amount: Sequelize.INTEGER,
  description: Sequelize.STRING,
  category: Sequelize.STRING,
});

module.exports = ExpensesT;
