const express = require('express');
const route = express.Router();
const ExpenseC = require('../controller/expenseC');


route.get('/verified-user',ExpenseC.profile);
route.post('/verified-user',ExpenseC.addExpense);
route.get('/verified-user/expenses',ExpenseC.getExpense);
route.delete('/verified-user/deleteExpenses/:expenseId',ExpenseC.deleteExpense);
module.exports=route;