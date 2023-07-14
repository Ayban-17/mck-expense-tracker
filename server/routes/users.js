const router = require("express").Router();

const {
  loginUser,
  createAccount,
  isLogin,
  logout,
} = require("../controller/users.controller.js");

router.post("/login", loginUser);
router.post("/register", createAccount);
router.post("/auth", isLogin);
router.post("/logout", logout);

module.exports = router;
