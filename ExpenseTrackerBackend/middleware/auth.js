const jwt = require("jsonwebtoken");
const User = require("../model/user");
//Pending Data Validation
const authenticate = async (req, res, next) => {
  try {
    if (req.header("Authorization")) {
      console.log("TOKEN");
      const token = req.header("Authorization");
      const userP = jwt.verify(token, "secretKey");
      if (userP) {
        console.log("USERP");
        const user = await User.findById(userP.userId);
        req.user = user;
        next();
      } else {
        return res.status(400).send({ message: "User not authentic" });
      }
    } else {
      return res.status(400).send({ message: "User not available" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ success: false, message: "User is not Authorized" });
  }
};

module.exports = { authenticate };
