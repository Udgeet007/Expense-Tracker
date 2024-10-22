const express = require('express');
const { createExpense, getUserExpense, deleteExpense } = require('../controllers/expenseController');
const router = express.Router();

router.post("/create",createExpense);
router.get('/getexpense/:_id',getUserExpense);
router.delete('/delete/:_id', deleteExpense);



module.exports = router;