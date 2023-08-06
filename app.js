const express = require("express");
const User = require("./ExpenseTrackerBackend/model/user");
// const ExpenseFile = require("./ExpenseTrackerBackend/model/expenseFile");
const bodyParser = require("body-parser");
const indexes = require("./ExpenseTrackerBackend/route/user");
const expenses = require("./ExpenseTrackerBackend/route/expenseR");
const purchase = require("./ExpenseTrackerBackend/route/purchase");
const premium = require("./ExpenseTrackerBackend/route/premiumR");
// const forgotPassword = require("./ExpenseTrackerBackend/model/passwordT");
const resetPasswordR = require("./ExpenseTrackerBackend/route/passwordR");
// const https = require("https");
const path = require("path");
const fs = require("fs");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// const privateKey = fs.readFileSync("server.key");
// const certificate = fs.readFileSync("server.cert");
dotenv.config();
const app = express();

app.use(
  express.static(path.join(__dirname, "ExpenseTrackerFrontEnd", "public"))
);
app.use(cors());

app.use(bodyParser.json());
app.use("/", indexes);
app.use("/expense", expenses);
app.use("/purchase", purchase);
app.use("/premium", premium);
app.use("/password", resetPasswordR);
app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "ExpenseTrackerFrontEnd", `view`, `index.html`)
  );
});
app.use(compression());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", "example.com"],
      },
    },
  })
);

const username = "arpitgauravgoldisahay007";
const password = "Arpit@123";
const dbName = "expensetracker";
const url = `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(
  password
)}@cluster0.xkzr2xq.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(url).then((result) => {
  app.listen(3000);
  console.log("Yes");
});

//for ssl security
// https
//   .createServer({ key: privateKey, cert: certificate }, app)
//   .listen(process.env.PORT_NO);
