// Course: MAD201 – Project 2
// Name: Jennyfer Parmar
// Student ID: A00201240
// Date: 12/12/25
// Description: Contains utility functions to calculate totals and summaries.

import { Transaction } from "../types/Transaction";

export const getTotals = (transactions: Transaction[]) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0); // Sum income

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0); // Sum expenses

  return { income, expenses, balance: income - expenses }; // Balance = income - expenses
};

export const getCategorySummary = (transactions: Transaction[]) => {
  const summary: Record<string, { income: number; expense: number }> = {}; // Category -> totals

  for (const t of transactions) {
    const key = t.category.trim() || "Uncategorized"; // Default category when empty
    if (!summary[key]) summary[key] = { income: 0, expense: 0 }; // Initialize category totals
    if (t.type === "income") summary[key].income += t.amount; // Add to income
    else summary[key].expense += t.amount; // Add to expense
  }

  return summary; // Return object used by Reports screen
};
