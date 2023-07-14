const router = require("express").Router();

const {
  addIncome,
  getIncome,
  updateIncome,
  getOneIncome,
  deleteIncome,
  addExpense,
  getOneExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} = require("../controller/statements.controller.js");

const requireAuth = require("../middleware/requireAuth.js");

router.use(requireAuth);

router.post("/income", addIncome);
router.patch("/income", updateIncome);
router.get("/income", getIncome);
router.get("/income/:id", getOneIncome);
router.delete("/income/:id", deleteIncome);

router.post("/expense", addExpense);
router.patch("/expense", updateExpense);
router.get("/expense", getExpenses);
router.get("/expense/:id", getOneExpense);
router.delete("/expense/:id", deleteExpense);

module.exports = router;
