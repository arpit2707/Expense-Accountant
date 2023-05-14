const sequelize = require("sequelize");
const Sequelizer = require("../util/db");

const forgotPassword = Sequelizer.define("forgotPassword", {
  id: {
    type: sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  active: sequelize.BOOLEAN,
  expiresby: sequelize.DATE,
});

module.exports = forgotPassword;
