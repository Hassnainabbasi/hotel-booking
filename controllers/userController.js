const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res, next) => {
  const { name, email, password, isAdmin } = req.body;

  try {
    const exisitingUser = await User.findOne({ email });

    if (exisitingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashpassword = await bcrypt.hash(password, 10);

    const user = await new User({
      name,
      email,
      password: hashpassword,
      isAdmin,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.find();
    if (!user) {
      res.status(400);
      throw new Error("User are not available");
    }
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};

const singleUserUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(400);
      throw new Error("UserId are not available");
    }
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!user) {
      res.status(400);
      throw new Error("UserUpdateId are not available");
    }
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("UserUpdateId are not available");
  }
  res.status(201).json(user);
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("Invalid Email");
    }

    const correct = await bcrypt.compare(password, user.password);
    if (!correct) {
      res.status(400);
      throw new Error("Incorrect Password");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SEC);
    res.cookie("jwt", token);

    const { password : userPassword, ...rest} = user._doc
    return res.status(200).json({
      ...rest,
      token
    })

    console.log(token);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = async (req, res, next) => {
  res.cookie("jwt", " ", { expiresIn: "-1" });
  return res.json({ message: "logout user" });
};  

module.exports = {
  createUser,
  getUser,
  singleUserUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser
};
