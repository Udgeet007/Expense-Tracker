const mongoose = require('mongoose');


const expenseSchema = new mongoose.Schema({
  
});

module.exports = mongoose.model('expense',expenseSchema);