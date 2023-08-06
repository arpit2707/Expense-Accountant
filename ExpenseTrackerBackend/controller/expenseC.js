const path = require("path");
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
    console.log(req.user);
    const expense = new expenseT({
      amount: amount,
      description: description,
      category: category,
      userId: req.user._id,
    });
    await expense.save();
    const newAmount = Number(req.user.totalExpense) + Number(amount);
    const resulting = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          totalExpense: newAmount,
        },
        $push: {
          expenses: expense._id,
        },
      }
    );
    console.log("Expense Consoling" + expense);
    return res.status(201).json({ expense });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ success: false, error: err });
  }
};

exports.getPage = async (req, res) => {
  try {
    console.log("this is user IDDDDDDDDDDDDDD" + req.user._id);
    console.log("Yahan tk aaya");
    const page = req.params.pageNo;
    let entry_size = parseInt(req.header("entry_size"));
    const expense = await expenseT
      .find({
        userId: req.user._id,
      })
      .limit(entry_size)
      .skip((page - 1) * entry_size)
      .exec();
    let totalExpenseCount = await expenseT.countDocuments({
      userId: req.user._id,
    });
    let curr = parseInt(page);
    let prev = parseInt(page) - 1;
    let next = parseInt(page) + 1;
    return res.status(201).json({
      expense,
      success: true,
      ispremiumuser: req.user.ispremiumuser,
      currentPage: curr,
      nextPage: next,
      prevPage: prev,
      hasNextPage: entry_size * curr < totalExpenseCount,
      hasPreviousPage: curr > 1,
      lastPage: Math.ceil(totalExpenseCount / entry_size),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err, success: false });
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    console.log(req.params);

    const id = req.params.expenseId;
    if (id == undefined || id.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "trying to delete unavailable item" });
    }
    const reducingAmount = await expenseT.findOneAndDelete({ _id: id });
    const newAmount =
      Number(req.user.totalExpense) - Number(reducingAmount.amount);
    const resulting = await User.findOneAndUpdate(
      {
        _id: req.user._id,
      },
      {
        $set: {
          amount: newAmount,
        },
        $pull: { expenses: id },
      }
    );
    return res
      .status(200)
      .json({ success: true, message: "Deleted Successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, success: false, message: "Failed In Deleting" });
  }
};
