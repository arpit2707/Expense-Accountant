const User = require("../model/user");

exports.showLeaderboard = async (req, res) => {
  try {
    const result = await User.findAll({
      attributes: ["name", "totalExpense"],
      order: [["totalExpense", "DESC"]],
    });
    return res
      .status(201)
      .json({
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
