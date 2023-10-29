const express = require("express");
const route = express.Router();
const ExpenseC = require("../controller/expenseC");
const userAuthentication = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

route.get("/verified-user", ExpenseC.profile);

const addExpenseValidator = [
  body("amount").notEmpty(),
  body("description").trim().notEmpty(),
  body("category").notEmpty(),
];
route.post(
  "/verified-user",
  userAuthentication.authenticate,
  addExpenseValidator,
  ExpenseC.addExpense
);

route.get(
  "/verified-user/expenses/:pageNo",
  userAuthentication.authenticate,
  ExpenseC.getPage
);
route.delete(
  "/verified-user/deleteExpenses/:expenseId",
  userAuthentication.authenticate,
  ExpenseC.deleteExpense
);
module.exports = route;
