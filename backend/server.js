const express = require("express");
const app = express();
const port = 6000;
const connection = require("./db");
connection();

const userRouter = require('./routes/userRoutes');

app.get("/", (req, res) => {
  res.send("Welcome Page!");
});

app.use('/api/users',userRouter);


app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
