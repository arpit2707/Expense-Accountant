// const mongoDb = require("mongodb");
// const mongoClient = mongoDb.MongoClient;

// let _db;

// //mongoConnect is to keep connected to database
// const mongoConnect = async (callback) => {
//   try {
//     const username = "arpitgauravgoldisahay007";
//     const password = "Arpit@123";
//     const dbName = "expensetracker";
//     const url = `mongodb+srv://${encodeURIComponent(
//       username
//     )}:${encodeURIComponent(
//       password
//     )}@cluster0.xkzr2xq.mongodb.net/${dbName}?retryWrites=true&w=majority`;

//     const client = await mongoClient.connect(url);

//     _db = client.db();
//     callback(client);
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };

// //getDb is the function to get multiple instances to wo0rk with db
// const getDb = () => {
//   if (_db) {
//     return _db;
//   }
//   throw "no database found";
// };

// //Having both the method is the good wway to work with databases

// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;
