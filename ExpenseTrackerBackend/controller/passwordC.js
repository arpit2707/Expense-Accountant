const uuid = require("uuid");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const ForgotPassword = require("../model/passwordT");

const Sib = require("sib-api-v3-sdk");
const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SEND_IN_BLUE_API_KEY;
require("dotenv").config();

const sendResetLink = async (req, res) => {
  try {
    const user = await User.findOne({ email: `${req.body.email}` });
    if (user) {
      const id = uuid.v4();
      const result = new ForgotPassword({
        pid: id,
        active: true,
        userId: user._id,
      });
      await result.save();
      console.log("Here is forgot" + result);
      const tranEmailApi = new Sib.TransactionalEmailsApi();

      const sender = {
        email: "arpitgaurav.goldi723@gmail.com",
      };

      const receivers = [
        {
          email: `${req.body.email}`,
          name: "Goldi",
        },
      ];

      const response = await tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: "Change Password Link",
        textContent: "Reset Password",
        htmlContent: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
      });

      return res.status(200).json({
        message: "Link to reset password sent to your mail ",
        sucess: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: error, sucess: false });
  }
};

const resetpassword = async (req, res) => {
  try {
    const id = req.params.id;
    const forgotpasswordrequest = await ForgotPassword.findOne({
      pid: id,
    });
    if (forgotpasswordrequest.active) {
      forgotpasswordrequest.active = false;
      await forgotpasswordrequest.save();
      res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>

                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`);
      res.end();
    } else {
    }
  } catch (error) {
    console.log(error);
  }
};

const updatepassword = async (req, res) => {
  try {
    const { newpassword } = req.query;
    const { resetpasswordid } = req.params;
    const resetpasswordrequest = await ForgotPassword.findOne({
      pid: resetpasswordid,
    });

    const user = await User.findOne({ _id: resetpasswordrequest.userId });

    if (user) {
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
          console.log(err);
          throw new Error(err);
        }
        bcrypt.hash(newpassword, salt, function (err, hash) {
          // Store hash in your password DB.
          if (err) {
            console.log(err);
            throw new Error(err);
          }
          user.password = hash;
          user.save().then(() => {
            res
              .status(200)
              .json({ message: "Successfuly update the new password" });
          });
        });
      });
    } else {
      return res.status(404).json({ error: "No user Exists", success: false });
    }
  } catch (error) {
    return res.status(403).json({ error, success: false });
  }
};
module.exports = { resetpassword, sendResetLink, updatepassword };
