const Razorpay = require("razorpay");
const Order = require("../model/order");
const User = require("../model/user");
const Expenses = require("../model/expenseT");
// const sequelize = require("../util/db");
// const Sequelizer = require("sequelize");
require("dotenv").config();

exports.purchasePremium = async (req, res) => {
  try {
    console.log(`Yahan tk aaya`);
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    var rzp = new Razorpay({ key_id, key_secret });
    const amount = 2500;
    //Start creating order on Razorpay
    rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      //Order created successfully and here we are saving it in the db using magic function
      const result = new Order({
        orderid: order.id,
        status: "PENDING",
        userId: req.user._id,
      });
      await result.save();
      return res.status(201).json({ orderid: order.id, key_id: rzp.key_id });
    });
  } catch (err) {
    res
      .status(403)
      .json({ message: "something went wrong from purchase", error: err });
  }
};

exports.updateTransactionStatus = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;
    console.log("Aa gya success update karne");
    const userUpdatePromise = await Order.findOneAndUpdate(
      { orderid: order_id },
      {
        $set: {
          paymentid: payment_id,
          status: "SUCCESSFUL",
        },
      }
    );
    const nowPremium = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          ispremiumuser: true,
        },
      }
    );
    console.log(userUpdatePromise);
    return res
      .status(202)
      .json({ success: true, message: "Transaction successful" });
  } catch (err) {
    res.status(403).json({ success: false, message: "Transaction failed" });
  }
};

exports.failedTransactionStatus = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;

    const userUpdatePromise = await Order.findOneAndUpdate(
      { orderid: order_id },
      {
        $set: { paymentid: payment_id, status: "FAILED" },
      }
    );

    console.log(userUpdatePromise);
    await Promise.all([userUpdatePromise]);
    return res
      .status(202)
      .json({ success: true, message: "Transaction FAILED" });
  } catch (err) {
    return res.status(403).json({ success: false, message: "UPDATION failed" });
  }
};
