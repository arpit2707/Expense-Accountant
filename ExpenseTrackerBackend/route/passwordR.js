const express = require("express");
const route = express.Router();
const passwordC = require("../controller/passwordC");

route.post("/sendResetLink", passwordC.sendResetLink);
route.get("/resetpassword/:id", passwordC.resetpassword);
route.get("/updatepassword/:resetpasswordid", passwordC.updatepassword);

module.exports = route;
