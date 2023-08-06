const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Expenses = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  ispremiumuser: {
    type: Boolean,
  },
  totalExpense: {
    type: Number,
    default: 0,
  },
  expenses: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "expenses",
    default: [],
  },
});
module.exports = mongoose.model("users", Expenses);

// // class  {
// //   constructor(name, email, password, ispremiumuser, totalExpense = 0) {
// //     this.name = name;
// //     this.email = email;
// //     this.password = password;
// //     this.ispremiumuser = ispremiumuser;
// //     this.totalExpense = totalExpense;
// //   }
// //   save() {
// //     const db = getDb();
// //     return db.collection("users").insertOne(this);
// //   }

// //   static findByEmail(email) {
// //     const db = getDb();
// //     return db.collection("users").findOne({ email });
// //   }

// //   static async findById(userId) {
// //     const userIdObj = new ObjectId(userId);
// //     const db = getDb();
// //     const result = await db.collection("users").findOne({ _id: userIdObj });
// //     return result;
// //   }

// //   static updateTotalExpense(userId, newTotalExpense) {
// //     const db = getDb();
// //     return db
// //       .collection("users")
// //       .updateOne({ _id: userId }, { $set: { totalExpense: newTotalExpense } });
// //   }
// // }

// // const Sequelize = require("sequelize");

// // const sequelize = require("../util/db");

// // const Expenses = sequelize.define("user", {
// //   id: {
// //     type: Sequelize.INTEGER,
// //     autoIncrement: true,
// //     allowNull: false,
// //     primaryKey: true,
// //   },
// //   name: Sequelize.STRING,
// //   email: {
// //     type: Sequelize.STRING,
// //     unique: true,
// //   },
// //   password: Sequelize.STRING,
// //   ispremiumuser: Sequelize.BOOLEAN,
// //   totalExpense: {
// //     type: Sequelize.INTEGER,
// //     defaultValue: 0,
// //   },
// // });
