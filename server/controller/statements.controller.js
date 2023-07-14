const Income = require("../model/income.model.js");
const Expense = require("../model/expense.model.js");

const addIncome = async (req, res) => {
  try {
    const income = await Income.addIncome(req.body, req.identity);
    res.status(200).json({ msg: "Added Successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getIncome = async (req, res) => {
  try {
    const income = await Income.find({ user: req.identity }).sort({
      createdAt: -1,
    });
    res.status(200).json(income);
  } catch (error) {
    res.status(204).json({ error });
  }
};

const getOneIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await Income.findOne({ _id: id });
    res.status(200).json(income);
  } catch (error) {
    res.status(204).json({ error });
  }
};

const updateIncome = async (req, res) => {
  const { _id } = req.body;
  try {
    await Income.findByIdAndUpdate({ _id }, { ...req.body });
    res.status(200).json({ msg: "Successfully Updated" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await Income.findOneAndRemove({ _id: id });

    if (!income) return res.status(404).json({ msg: "No Such Salary" });

    res.status(200).json({ msg: "Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const addExpense = async (req, res) => {
  try {
    const expense = await Expense.addExpense(req.body, req.identity);
    res.status(200).json({ msg: "Added Successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getOneExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findOne({ _id: id });

    res.status(200).json(expense);
  } catch (error) {
    res.status(204).json({ error });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expense = await Expense.find({ user: req.identity }).sort({
      createdAt: -1,
    });
    res.status(200).json(expense);
  } catch (error) {
    res.status(204).json({ error });
  }
};

const updateExpense = async (req, res) => {
  const { _id } = req.body;
  try {
    const expense = await Expense.findByIdAndUpdate({ _id }, { ...req.body });
    if (!expense) return res.status(404).json({ msg: "No Such Income" });

    res.status(200).json({ msg: "Successfully Updated" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findOneAndRemove({ _id: id });

    if (!expense) return res.status(404).json({ msg: "No Such Income" });

    res.status(200).json({ msg: "Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  addIncome,
  getIncome,
  updateIncome,
  getOneIncome,
  deleteIncome,
  addExpense,
  getExpenses,
  getOneExpense,
  updateExpense,
  deleteExpense,
};
