const express = require("express");
const { UserModel } = require("../model/User.Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRouter = express.Router();

// userRouter.get("/", async (req, res) => {
//   const data = await UserModel.find();
//   res.send(data);
// });

// userRouter.post("/register", (req, res) => {
//   const { name, password, email, mobile, website } = req.body;
//   try {
//     bcrypt.hash(password, 5, async (err, pass) => {
//       // Store hash in your password DB.
//       if (err) {
//         console.log(err);
//       } else {
//         const user = new UserModel({
//           name,
//           email,
//           website,
//           mobile,
//           password: pass,
//         });
//         await user.save();
//         res.send("register");
//       }
//     });
//   } catch (err) {
//     res.send("err to register");
//   }
// });

// userRouter.post("/login", async (req, res) => {
//   const { password, email } = req.body;
//   try {
//     const user = await UserModel.findOne({ email });
//     if (user.length > 0) {
//       bcrypt.compare(password, user.password, function (err, result) {
//         // result == false
//         if (result) {
//           const token = jwt.sign({ userID: user._id }, process.env.key);
//           res.send({token:token});
//         } else {
//           res.send("check password again");
//         }
//       });
//     }
//   } catch (err) {
//     res.send("err to register");
//   }
// });

userRouter.get("/", async (req, res) => {
  let users = await UserModel.find();
  res.send(users);
});

userRouter.post("/register", async (req, res) => {
  const { website, name, email, mobile, password,  } = req.body;
  try {
    let newUser = new UserModel({
      mobile,
      name,
      email,
      password,
      website
    });
    await newUser.save();
    res.status(200).send(newUser);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let existingUser = await UserModel.findOne({ email, password });

    if (existingUser) {
      let token = jwt.sign(
        {
          _id: existingUser._id,
          email: existingUser.email,
          role: existingUser.role,
        },
        process.env.key
      );
      res.status(200).send({ token: token });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = {
  userRouter,
};
