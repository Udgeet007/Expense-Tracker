const mongoose = require("mongoose");

const connectRoDb = () => {
  mongoose.connect("mongodb://localhost:27017/expenseTracker").then(() => console.log("MongoDb is Connected Successfully")).catch(() => console.log("error in connecting mongodb"));
};


module.exports = connectRoDb;
