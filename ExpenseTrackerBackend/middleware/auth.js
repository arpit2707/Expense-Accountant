const jwt = require("jsonwebtoken");
const User = require("../model/user");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const userP = jwt.verify(token, "secretKey");
    const user = await User.findById(userP.userId);
    console.log(userP);
    console.log(user);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ success: false, message: "User is not Authorized" });
  }
};

module.exports = { authenticate };
