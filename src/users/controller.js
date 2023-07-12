const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({ message: "Register Successfull" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUsersById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });
    if (user) {
      res.status(202).json({
        email: user.email,
        username: user.username,
        age: user.age,
        role: user.role,
        balance: user.balance,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    await User.findOne({ email: email }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.json({
              error: err,
            });
          }
          if (result) {
            let token = jwt.sign(
              {
                id: user._id,
              },
              "verySecretValue",
              { expiresIn: "5h" }
            );
            res.json({
              id: user.id,
              message: "Login Successfull",
              email: user.email,
              username: user.username,
              age: user.age,
              role: user.role,
              balance: user.balance,
              token,
            });
          } else {
            res.json({
              message: "Password does not matched",
            });
          }
        });
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const topUp = async (req, res) => {
  try {
    const { id } = req.params;
    const newBalance = req.body.balance;
    const getUser = await User.findById(id);
    if (getUser) {
      const updateBalance = await User.findByIdAndUpdate(id, {
        balance: newBalance + getUser.balance,
      });
      if (updateBalance) {
        const getUserUpdate = await User.findById(id);
        if (getUserUpdate) {
          res.status(202).json(getUserUpdate);
        } else {
          res.status(401).json("Failed top-up balance");
        }
      } else {
        res.status(401).json("Failed top-up balance");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  login,
  topUp,
  getUsersById,
};
