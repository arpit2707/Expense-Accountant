const User = require("../model/user");
const ExpenseFile = require("../model/expenseFile");
const UserServices = require("../services/userServices");
const S3Services = require("../services/s3Services");
const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const { fileURLToPath } = require("url");
require("dotenv").config();
//const convertToCsv = require("your-csv-converter-library");

exports.showLeaderboard = async (req, res) => {
  try {
    const result = await User.findAll({
      attributes: ["name", "totalExpense"],
      order: [["totalExpense", "DESC"]],
    });
    return res.status(201).json({
      success: true,
      message: "Successfully returned leaderboard data",
      result,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(403)
      .json({ success: false, message: "leaderboard failed" });
  }
};

exports.downloadExpenseFile = async (req, res) => {
  try {
    const result = await UserServices.getExpenses(req);
    const expenseData = JSON.stringify(result);
    const fileName = `Expense${req.user.id}/${new Date()}.txt`;
    // const filePath = path.join(__dirname, "Expense.txt");
    // fs.writeFileSync(filePath, expenseData);
    console.log("In download function");
    const fileUrl = await S3Services.uploadToS3(expenseData, fileName);
    console.log("checking Url");
    console.log(fileUrl);
    ExpenseFile.create({ fileUrl: fileUrl, userId: req.user.id });
    return res.status(201).json({ success: true, fileUrl });
  } catch (error) {
    console.log(error);
  }
};
