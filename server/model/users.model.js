const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.register = async function ({ name, username, password }) {
  if (!username || !name || !password) throw Error("All Fields Are Required");

  const exists = await this.findOne({ username });

  if (exists) throw Error("Username Already in Use. Create Another One");

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = await this.create({ name, username, password: hashed });
  return user;
};

userSchema.statics.login = async function ({ username, password }) {
  if (!username || !password) throw Error("Username and Password are required");

  const user = await this.findOne({ username });

  if (!user) throw Error("Incorrect username");

  const matched = await bcrypt.compare(password, user.password);

  if (!matched) throw Error("Incorrect Password");

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
