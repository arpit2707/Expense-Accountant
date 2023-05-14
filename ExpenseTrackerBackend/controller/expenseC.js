const path = require("path");
const sequelize = require("sequelize");
const expenseT = require("../model/expenseT");
const User = require("../model/user");
let expenseHtmlFile = path.join(
  __dirname,
  "../../ExpenseTrackerFrontEnd/view/expenses/expenseForm.html"
);

exports.profile = (req, res, next) => {
  try {
    console.log("Pehle Profile me aaya");
    res.status(200).sendFile(expenseHtmlFile);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.addExpense = async (req, res, next) => {
  try {
    const { amount, description, category } = req.body;

    if (amount == undefined || amount === 0) {
      return res.status(400).json({ success: false });
    }
    console.log(
      `amount is ${amount}  description is ${description}   category is ${category}  user id is ${req.user.id}`
    );
    const response = await expenseT.create({
      amount,
      description,
      category,
      userId: req.user.id,
    });
    const newAmount = Number(req.user.totalExpense) + Number(amount);
    const resulting = await User.update(
      { totalExpense: newAmount },
      { where: { id: req.user.id } }
    );
    //const resulting = await User.increment(totalExpense, { by: amount, where: { id: req.user.id } });
    // console.log("resulting it here");
    // console.log(resulting);
    return res.status(201).json({ response, success: true });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ success: false, error: err });
  }
};

exports.getExpense = async (req, res, next) => {
  try {
    console.log("this is user IDDDDDDDDDDDDDD" + req.user.id);
    const expenses = await req.user.getExpenses(); //Insted of this magic function works like this const expenses  =  await expenseT.findAll({where:{userId:req.user.id}});
    return res
      .status(200)
      .json({ expenses, success: true, ispremiumuser: req.user.ispremiumuser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err, success: false });
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    console.log("Here checking params");
    console.log(req.params);

    const id = req.params.expenseId;
    const reducingAmount = await expenseT.findOne({
      attributes: ["amount"],
      where: { id: id },
    });
    const newAmount = Number(req.user.totalExpense) - Number(reducingAmount);
    const resulting = await User.update(
      { totalExpense: newAmount },
      { where: { id: req.user.id } }
    );

    if (id == undefined || id.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "trying to delete unavailable item" });
    }
    await expenseT.destroy({ where: { id: id, userId: req.user.id } });
    return res
      .status(200)
      .json({ success: true, message: "Deleted Successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, success: false, message: "Failed In Deleting" });
  }
};
