const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incomeSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

incomeSchema.statics.addIncome = async function (
  { date, category, amount },
  { _id }
) {
  if (!date || !category || !amount) throw Error("All Fields are required");

  const income = await this.create({ date, category, amount, user: _id });

  return income;
};

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
