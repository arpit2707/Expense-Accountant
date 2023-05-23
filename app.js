const express = require("express");
const sequelize = require("./ExpenseTrackerBackend/util/db");
const User = require("./ExpenseTrackerBackend/model/user");
const Expense = require("./ExpenseTrackerBackend/model/expenseT");
const Order = require("./ExpenseTrackerBackend/model/order");
const ExpenseFile = require("./ExpenseTrackerBackend/model/expenseFile");
const bodyParser = require("body-parser");
const indexes = require("./ExpenseTrackerBackend/route/user");
const expenses = require("./ExpenseTrackerBackend/route/expenseR");
const purchase = require("./ExpenseTrackerBackend/route/purchase");
const premium = require("./ExpenseTrackerBackend/route/premiumR");
const forgotPassword = require("./ExpenseTrackerBackend/model/passwordT");
const resetPasswordR = require("./ExpenseTrackerBackend/route/passwordR");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(
  express.static(path.join(__dirname, "ExpenseTrackerFrontEnd", "public"))
);
app.use(cors());

ExpenseFile.belongsTo(User, { foreignKey: "userId" });
User.hasMany(ExpenseFile, { foreignKey: "userId" });

Expense.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Expense, { foreignKey: "userId" });

Order.belongsTo(User);
User.hasMany(Order);

User.hasMany(forgotPassword);
forgotPassword.belongsTo(User);

app.use(bodyParser.json());
app.use("/", indexes);
app.use("/expense", expenses);
app.use("/purchase", purchase);
app.use("/premium", premium);
app.use("/password", resetPasswordR);

sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      console.log("NO USERRRR");
    }
    return user;
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000);
