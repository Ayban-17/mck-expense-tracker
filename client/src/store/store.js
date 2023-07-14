import { create } from "zustand";

export const userStore = create((set) => ({
  userInfo: null,

  setUserInfo: (value) => {
    set(() => ({
      userInfo: value,
    }));
  },
}));

export const useMenuStore = create((set) => ({
  isOpen: true,
  setIsOpen: (value) =>
    set(() => ({
      isOpen: value,
    })),
}));

export const useStatementStore = create((set) => ({
  incomes: [],
  setIncomes: (value) => {
    set(() => ({
      incomes: value,
    }));
  },

  incomeToEdit: null,
  setIncomeToEdit: (value) => {
    set(() => ({
      incomeToEdit: value,
    }));
  },

  incomeToDelete: null,
  setIncomeToDelete: (value) => {
    set(() => ({
      incomeToDelete: value,
    }));
  },

  revenue: 0,
  setRevenue: (value) => {
    set(() => ({
      revenue: value,
    }));
  },

  expenses: [],
  setExpense: (value) => {
    set(() => ({
      expenses: value,
    }));
  },

  expenseToEdit: null,
  setExpenseToEdit: (value) => {
    set(() => ({
      expenseToEdit: value,
    }));
  },

  expenseToDelete: null,
  setExpenseToDelete: (value) => {
    set(() => ({
      expenseToDelete: value,
    }));
  },

  expenditure: 0,
  setExpenditure: (value) => {
    set(() => ({
      expenditure: value,
    }));
  },
}));
