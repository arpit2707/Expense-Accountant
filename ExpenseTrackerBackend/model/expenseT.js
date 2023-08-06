const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpensesT = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});
module.exports = mongoose.model("expenses", ExpensesT);

// // class ExpensesT {
// //   constructor(amount, description, category, userId) {
// //     this.amount = amount;
// //     this.description = description;
// //     this.category = category;
// //     this.userId = userId;
// //   }
// //   async save() {
// //     const db = getDb();
// //     return db.collection("expense").insertOne(this);
// //   }
// //   static findById(expenseId) {
// //     const db = getDb();
// //     return db.collection("expense").findOne({
// //       _id: new ObjectId(expenseId),
// //     });
// //   }
// // }

// // const collectionName = "expense"; // Replace "expenses" with your desired collection name

// // const addExpense = async (expenseData) => {
// //   const db = getDb();
// //   const expensesCollection = db.collection(collectionName);

// //   try {
// //     const result = await expensesCollection.insertOne(expenseData);
// //     return result.insertedId;
// //   } catch (err) {
// //     throw err;
// //   }
// // };

// // const getExpensesByUserId = async (userId, page, entry_size) => {
// //   const db = getDb();
// //   const expensesCollection = db.collection(collectionName);

// //   try {
// //     const skip = (page - 1) * entry_size;
// //     const expenses = await expensesCollection
// //       .find({ userId })
// //       .skip(skip)
// //       .limit(entry_size)
// //       .toArray();

// //     const totalExpenseCount = await expensesCollection.countDocuments({
// //       userId,
// //     });

// //     return { expenses, totalExpenseCount };
// //   } catch (err) {
// //     throw err;
// //   }
// // };

// // const deleteExpense = async (expenseId, userId) => {
// //   const db = getDb();
// //   const expensesCollection = db.collection(collectionName);

// //   try {
// //     const reducingAmount = await expensesCollection.findOne(
// //       { _id: expenseId },
// //       { projection: { amount: 1 } }
// //     );

// //     const newAmount = Number(reducingAmount.amount);
// //     const userCollection = db.collection("users");
// //     await userCollection.updateOne(
// //       { _id: userId },
// //       { $inc: { totalExpense: -newAmount } }
// //     );

// //     await expensesCollection.deleteOne({ _id: expenseId, userId });
// //   } catch (err) {
// //     throw err;
// //   }
// // };

// // module.exports = {
// //   addExpense,
// //   getExpensesByUserId,
// //   deleteExpense,
// // };

// // const Sequelize = require("sequelize");

// // const sequelize = require("../util/db");

// // const ExpensesT = sequelize.define("expense", {
// //   id: {
// //     type: Sequelize.INTEGER,
// //     autoIncrement: true,
// //     allowNull: false,
// //     primaryKey: true,
// //   },
// //   amount: Sequelize.INTEGER,
// //   description: Sequelize.STRING,
// //   category: Sequelize.STRING,
// // });

// module.exports = ExpensesT;
