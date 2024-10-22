const express = require('express');
const { createUser, loginUser, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.post('/create',createUser);
router.post('/login',loginUser);
router.put('/update/:_id',updateUser);
router.delete('/delete/:_id', deleteUser);


module.exports = router;
