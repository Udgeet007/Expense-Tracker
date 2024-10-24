const express = require("express");
const app = express();
const port = 5000;
const cors = require('cors');
const connection = require("./db");
connection();
// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cors());
const userRouter = require('./routes/userRoutes');
const expenseRouter = require('./routes/expenseRoutes');

app.get("/", (req, res) => {
  res.send("Welcome Page!");
});


app.use('/api/users',userRouter);
app.use('/api/expense',expenseRouter);


app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
