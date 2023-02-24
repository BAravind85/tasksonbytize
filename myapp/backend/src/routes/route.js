const express = require("express");
const User = require("../model/userModel");
const Student = require("../model/studentModel");

const userRouter = express.Router();

//for login user
userRouter.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  //if user exists
  if (user) {
    if ((req.body.password, user.password)) {
      res.send({
        _id: user._id,
        email: user.email,
      });
      return;
    }
  }
  res.status(401).send({ message: "Invalid Email or password" });
});
// for register user
userRouter.post("/register", async (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
  });
  const user = await newUser.save();
  console.log(user);
  res.json({
    _id: user._id,
    email: user.email,
    password: user.password,
  });
});
// Students
userRouter.post("/home", async (req, res) => {
  const studentList = new Student({
    name: req.body.name,
    roll_no: req.body.roll_no,
    studied: req.body.studied,
    address: req.body.address,
  });
  const student = await studentList.save();
  console.log(student);
  res.json({
    _id: student._id,
    name: student.name,
    roll_no: student.roll_no,
    studied: student.studied,
    address: student.address,
  });
});

userRouter.get("/list", async (req, res) => {
  const list = await Student.find();
  return res.send(list);
});

module.exports = userRouter;
