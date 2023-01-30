const express = require("express");
const { connection } = require("./config/db");
const { auth } = require("./middeleware/auth.middelware");
const { userRouter } = require("./routers/User.route");
const cors = require('cors')
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to engagebay");
});

app.use("/users", userRouter);
app.use(auth);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connect to mongodb");
  } catch (err) {
    console.log(err);
  }
  console.log(`server at ${process.env.port}`);
});
