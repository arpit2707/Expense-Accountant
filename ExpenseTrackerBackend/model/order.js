const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema({
  paymentid: {
    type: String,
  },
  orderid: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("orders", Order);
// // const Sequelize = require("sequelize");

// // const sequelize = require("../util/db");

// // const Order = sequelize.define("orders", {
// //   id: {
// //     type: Sequelize.INTEGER,
// //     autoIncrement: true,
// //     allowNull: false,
// //     primaryKey: true,
// //   },
// //   paymentid: Sequelize.STRING,
// //   orderid: Sequelize.STRING,
// //   status: Sequelize.STRING,
// // });

// // module.exports = Order;
