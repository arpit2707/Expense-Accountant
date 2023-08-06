const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forgotPassword = new Schema({
  pid: String,
  active: Boolean,
  userId: {
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("forgotpasswords", forgotPassword);
// const sequelize = require("sequelize");
// const Sequelizer = require("../util/db");

// const forgotPassword = Sequelizer.define("forgotPassword", {
//   id: {
//     type: sequelize.UUID,
//     allowNull: false,
//     primaryKey: true,
//   },
//   active: sequelize.BOOLEAN,
//   expiresby: sequelize.DATE,
// });

// module.exports = forgotPassword;
