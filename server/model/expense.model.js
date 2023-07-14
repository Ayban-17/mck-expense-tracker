const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
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

expenseSchema.statics.addExpense = async function (
  { date, category, amount },
  { _id }
) {
  if (!date || !category || !amount) throw Error("All Fields are required");

  const expense = await this.create({ date, category, amount, user: _id });

  return expense;
};

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
