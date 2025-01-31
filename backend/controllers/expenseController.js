let expenseCollection = require("../modules/Expense");

const createExpense = async (req, res) => {
  const { expenseName, date, price, userId } = req.body;
  try {
    let data = await expenseCollection.create({
      expenseName,
      date,
      price,
      userId,
    });
    // console.log(data)
    res.json({ msg: "expense created successfully", success: true });
  } catch (error) {
    res.json({
      msg: "error in creating expense",
      success: false,
      error: error.message,
    });
  }
};

const getUserExpense = async (req, res) => {
  let id = req.params._id;
  try {
    let expenses = await expenseCollection.find({ userId: id });
    if (expenses) {
      res.json({ msg: "fetched successfully", success: true, expenses });
      // console.log(expenses);
    } else {
      res.json({ msg: "expenses not found", success: true });
    }
  } catch (error) {
    res.json({
      msg: "error in getting user expense",
      success: false,
      error: error.message,
    });
  }
};

const deleteExpense = async (req, res) => {
  const _id = req.params._id;
  await expenseCollection.findByIdAndDelete(_id);
  res.json({ msg: "expense deleted successfully", success: true });
};

const updateExpense = async (req, res) => {
  const { expenseName, price, date } = req.body;
  const _id = req.params._id;

  try {
    let expenseData = await expenseCollection.findByIdAndUpdate(
      _id,
      {
        $set: { expenseName, price, date },
      },
      { new: true }
    );
    res.json({
      msg: "expense updated successfully",
      success: true,
      expense: expenseData,
    });
  } catch (error) {
    res.json({
      msg: "error in updating expense",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createExpense,
  getUserExpense,
  deleteExpense,
  updateExpense
};
