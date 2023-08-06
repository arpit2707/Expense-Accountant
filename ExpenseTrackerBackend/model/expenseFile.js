const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileT = new Schema({
  fileUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});
module.exports = mongoose.model("expensefiles", fileT);
// const getDb = require("../util/db").getDb;
// class fileT {
//   constructor(fileUrl) {
//     this.fileUrl = fileUrl;
//   }
//   async save() {
//     try {
//       const db = getDb();
//       const response = await db.collection("expenseFile").insertOne(this);
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }
