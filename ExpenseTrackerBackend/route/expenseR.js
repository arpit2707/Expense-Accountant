const express = require("express");
const route = express.Router();
const ExpenseC = require("../controller/expenseC");
const userAuthentication = require("../middleware/auth");

route.get("/verified-user", ExpenseC.profile);
route.post(
  "/verified-user",
  userAuthentication.authenticate,
  ExpenseC.addExpense
);
route.get(
  "/verified-user/expenses",
  userAuthentication.authenticate,
  ExpenseC.getExpense
);
route.delete(
  "/verified-user/deleteExpenses/:expenseId",
  userAuthentication.authenticate,
  ExpenseC.deleteExpense
);
module.exports = route;
