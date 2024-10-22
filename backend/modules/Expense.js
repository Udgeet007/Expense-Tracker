const mongoose = require('mongoose');


const expenseSchema = new mongoose.Schema({
  price:{
    type:Number,
    required:true,
  },
  date:{
    type:String,
    required:true,

  },
  expenseName:{
    type:String,
    required:true
  },
  userId:{
    type:String,
    required:true
  },
},{timestamps:true});

module.exports = mongoose.model('expenses',expenseSchema);