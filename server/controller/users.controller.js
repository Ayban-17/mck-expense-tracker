const User = require("../model/users.model.js");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const user = await User.login(req.body);
    const { name, _id } = user;

    try {
      const token = await jwt.sign({ name, userId: _id }, process.env.SECRET, {
        expiresIn: "1d",
      });
      res.cookie("token", token).json({ name });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const isLogin = async (req, res) => {
  try {
    const { token } = req.cookies;
    const userInfo = await jwt.verify(token, process.env.SECRET);
    res.json(userInfo);
  } catch (error) {
    res.status(204);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token").sendStatus(200);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createAccount = async (req, res) => {
  try {
    await User.register(req.body);
    res.json("Registration Success");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, createAccount, isLogin, logout };
