const uuid = require("uuid");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const ForgotPassword = require("../model/passwordT");

const Sib = require("sib-api-v3-sdk");
const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SEND_IN_BLUE_API_KEY;
require("dotenv").config();

exports.sendResetLink = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: `${req.body.email}` } });
    if (user) {
      const id = uuid.v4();
      user.createForgotPassword({ id, active: true }).catch((err) => {
        throw new Error(err);
      });
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
        htmlContent: `<a href="http://18.206.230.45:3000/password/resetpassword/${id}">Reset password</a>`,
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

exports.resetpassword = async (req, res) => {
  try {
    const id = req.params.id;
    const forgotpasswordrequest = await ForgotPassword.findOne({
      where: { id },
    });
    if (forgotpasswordrequest.active) {
      forgotpasswordrequest.update({ active: false });
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

exports.updatepassword = async (req, res) => {
  try {
    const { newpassword } = req.query;
    const { resetpasswordid } = req.params;
    const resetpasswordrequest = await ForgotPassword.findOne({
      where: { id: resetpasswordid },
    });

    const user = await User.findOne({
      where: { id: resetpasswordrequest.userId },
    });

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
          user.update({ password: hash }).then(() => {
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
