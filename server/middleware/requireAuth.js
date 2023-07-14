const jwt = require("jsonwebtoken");
const User = require("../model/users.model.js");
const requireAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(400).json({ error: "Request Denied" });

  try {
    const verified = jwt.verify(token, process.env.SECRET);
    const verifiedUser = await User.findOne({ _id: verified.userId }).select(
      "_id"
    );
    req.identity = verifiedUser;
    next();
  } catch (error) {
    res.status(400).json({ error: "Request Unauthorized" });
  }
};

module.exports = requireAuth;
